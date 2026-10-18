const fs=require('fs');
const path=require('path');
const os=require('os');
const {execFileSync}=require('child_process');
const {bundle}=require('@remotion/bundler');
const {selectComposition,renderFrames}=require('@remotion/renderer');
const root=path.resolve(__dirname,'..');
const ids=process.argv.includes('--portrait')?['IronArtPortrait']:
  process.argv.includes('--both')?['IronArtLandscape','IronArtPortrait']:['IronArtLandscape'];
(async()=>{
  execFileSync('ffmpeg',['-version'],{stdio:'ignore'});
  const serveUrl=await bundle({entryPoint:path.join(root,'src/index.ts'),enableCaching:false});
  fs.mkdirSync(path.join(root,'out'),{recursive:true});
  for(const id of ids){
    const composition=await selectComposition({serveUrl,id,inputProps:{silent:true}});
    const tempRoot=fs.realpathSync(os.tmpdir());
    const frames=fs.mkdtempSync(path.join(tempRoot,'ironart-frames-'));
    try{
      let last=-1;
      await renderFrames({serveUrl,composition,inputProps:{silent:true},muted:true,
        outputDir:null,imageFormat:'png',concurrency:5,
        onStart:()=>console.log(id+': generating frames'),
        onFrameBuffer:(buffer,f)=>fs.writeFileSync(path.join(frames,'frame-'+String(f).padStart(6,'0')+'.png'),buffer),
        onFrameUpdate:count=>{const percent=Math.floor(count/composition.durationInFrames*10)*10;
          if(percent!==last){last=percent;console.log(percent+'%');}},
      });
      const name=id==='IronArtPortrait'?'IronArt_Reels.mp4':'IronArt_16x9.mp4';
      const output=path.join(root,'out',name);
      execFileSync('ffmpeg',['-hide_banner','-loglevel','error','-y','-framerate',String(composition.fps),
        '-i',path.join(frames,'frame-%06d.png'),'-i',path.join(root,'public/ironart/music.mp3'),
        '-af','volume=0.72,afade=t=in:st=0:d=0.7,afade=t=out:st=24.5:d=1.5',
        '-frames:v',String(composition.durationInFrames),'-c:v','libx264','-preset','fast','-crf','18',
        '-pix_fmt','yuv420p','-c:a','aac','-b:a','192k','-ar','48000','-movflags','+faststart','-shortest',output],
        {stdio:'inherit'});
      console.log(output);
    }finally{
      const resolved=fs.realpathSync(frames);
      if(resolved.startsWith(tempRoot+path.sep)&&path.basename(resolved).startsWith('ironart-frames-'))
        fs.rmSync(resolved,{recursive:true,force:true});
    }
  }
  process.exit(0);
})().catch(e=>{console.error(e);process.exit(1);});
