import React, {useEffect, useState} from 'react';
import {AbsoluteFill, Audio, Img, Sequence, continueRender, delayRender, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

export const IRONART_DURATION = 780;
const C = {ink:'#151719', white:'#FFFFFF', steel:'#EBEDEF', gray:'#A1A7AF'};
const asset = (name:string) => staticFile('ironart/' + name);
const ease = (x:number) => 1-Math.pow(1-Math.max(0,Math.min(1,x)),3);
const intro = (f:number, delay=0) => ease((f-delay)/22);

const Fonts: React.FC = () => {
  const [handle] = useState(() => delayRender('Load IronArt brand fonts'));
  useEffect(() => {
    Promise.all([
      new FontFace('IronArt Sans', 'url("'+asset('DejaVuSans.ttf')+'")', {weight:'400'}).load(),
      new FontFace('IronArt Sans', 'url("'+asset('DejaVuSans-Bold.ttf')+'")', {weight:'700'}).load(),
      new FontFace('IronArt Mono', 'url("'+asset('DejaVuSansMono.ttf')+'")').load(),
    ]).then(fonts => {
      fonts.forEach(font => document.fonts.add(font));
      continueRender(handle);
    }).catch(e => {throw e;});
  }, [handle]);
  return null;
};

const Logo: React.FC<{width:number;style?:React.CSSProperties}> = ({width,style}) =>
  <Img src={asset('logo-master.png')} style={{width,height:'auto',display:'block',...style}} />;

const Photo: React.FC<{name:string;style?:React.CSSProperties;delay?:number}> = ({name,style,delay=0}) => {
  const f=useCurrentFrame();
  const p=intro(f,delay);
  return <Img src={asset(name)} style={{width:'100%',height:'100%',objectFit:'contain',
    transform:'translateY('+((1-p)*70+Math.sin(f/48)*3)+'px) scale('+(1.025-(f/180)*0.018)+')',
    opacity:p, ...style}} />;
};

const Frame:React.FC<{index:string;children:React.ReactNode}> = ({index,children}) => {
  const f=useCurrentFrame();
  const {width,height}=useVideoConfig();
  const portrait=height>width, m=portrait?76:96;
  const p=intro(f);
  return <AbsoluteFill style={{background:C.white,opacity:p,fontFamily:'IronArt Sans',color:C.ink,overflow:'hidden'}}>
    <div style={{position:'absolute',left:m,top:portrait?94:55}}>
      <Logo width={portrait?470:405}/>
    </div>
    <div style={{position:'absolute',right:m,top:portrait?132:89,fontFamily:'IronArt Mono',fontSize:portrait?26:18,color:C.gray}}>
      {index} / 04
    </div>
    {children}
    <div style={{position:'absolute',bottom:portrait?142:60,left:m,right:m,borderTop:'1px solid '+C.steel}}/>
    <div style={{position:'absolute',bottom:portrait?87:25,left:m,fontFamily:'IronArt Mono',fontSize:portrait?25:18,letterSpacing:1.5}}>
      IRONART.BG
    </div>
    <div style={{position:'absolute',bottom:portrait?87:25,right:m,fontSize:portrait?22:17,color:'#656B72'}}>
      СИСТЕМИ ЗА ВРАТИ И ПОРТАЛИ
    </div>
  </AbsoluteFill>;
};

const Copy:React.FC<{eyebrow:string;title:string;sub:string;children?:React.ReactNode}> = ({eyebrow,title,sub,children}) => {
  const f=useCurrentFrame(), {width,height}=useVideoConfig(), p=height>width;
  return <div style={{position:'absolute',left:p?76:96,top:p?370:278,width:p?930:780}}>
    <div style={{fontFamily:'IronArt Mono',fontSize:p?23:18,letterSpacing:2,color:'#6E747B',
      opacity:intro(f,3),transform:'translateY('+((1-intro(f,3))*22)+'px)'}}>{eyebrow}</div>
    <div style={{fontSize:p?86:74,fontWeight:700,lineHeight:1.12,letterSpacing:-2.7,
      marginTop:p?25:23,whiteSpace:'pre-line',opacity:intro(f,7),transform:'translateY('+((1-intro(f,7))*42)+'px)'}}>{title}</div>
    <div style={{fontSize:p?30:27,lineHeight:1.5,marginTop:p?28:23,color:'#5D636B',opacity:intro(f,13)}}>{sub}</div>
    <div style={{opacity:intro(f,18),marginTop:p?30:30}}>{children}</div>
  </div>;
};

const Metric:React.FC<{label:string;value:string;size?:number}> = ({label,value,size}) => {
  const {width,height}=useVideoConfig(), p=height>width;
  return <div>
    <div style={{fontFamily:'IronArt Mono',fontSize:p?23:18,letterSpacing:1.5,marginBottom:7}}>{label}</div>
    <div style={{fontSize:size??(p?114:108),fontWeight:700,letterSpacing:-4,lineHeight:1.05}}>{value}</div>
  </div>;
};

const ProductStage:React.FC<{children:React.ReactNode}> = ({children}) => {
  const {width,height}=useVideoConfig(), p=height>width;
  return <div style={{position:'absolute',left:p?64:925,top:p?930:180,width:p?952:900,height:p?770:755}}>
    {children}
  </div>;
};

const Intro:React.FC = () => {
  const f=useCurrentFrame(), {width,height}=useVideoConfig(), p=height>width;
  const a=intro(f,4);
  return <AbsoluteFill style={{background:C.white,color:C.ink,fontFamily:'IronArt Sans',overflow:'hidden'}}>
    <div style={{position:'absolute',inset:0,background:'linear-gradient(135deg,#EBEDEF 0%,#FFFFFF 58%)',opacity:.56}}/>
    <div style={{position:'absolute',left:p?76:170,top:p?425:260,width:p?930:1580,opacity:a,
      transform:'translateY('+((1-a)*40)+'px)'}}>
      <Logo width={p?930:1180} style={{margin:'0 auto'}}/>
      <div style={{height:3,background:C.ink,width:(intro(f,15)*100)+'%',marginTop:p?58:34}}/>
      <div style={{fontSize:p?61:51,fontWeight:700,lineHeight:1.28,marginTop:p?48:38,letterSpacing:-1.4,
        textAlign:p?'left':'center',opacity:intro(f,24)}}>
        ПЛАВНО ДВИЖЕНИЕ.<br/>СОЛИДНА КОНСТРУКЦИЯ.
      </div>
    </div>
    <div style={{position:'absolute',left:p?76:170,bottom:p?260:120,fontFamily:'IronArt Mono',fontSize:p?25:22,
      letterSpacing:3,color:'#5D636B',opacity:intro(f,35)}}>КОНЗОЛНИ КОМПЛЕКТИ · PSG GROUP</div>
  </AbsoluteFill>;
};

const Hero:React.FC = () => {
  const f=useCurrentFrame(), value=Math.round(ease((f-18)/32)*1500);
  return <Frame index="01">
    <Copy eyebrow="ЗА ТЕЖКИ ВРАТИ И ПОРТАЛИ" title={'КОНЗОЛНА\nСИСТЕМА'} sub="Комплект за конзолна плъзгаща врата.">
      <Metric label="ТОВАРОНОСИМОСТ ДО" value={value.toLocaleString('bg-BG')+' кг'}/>
    </Copy>
    <ProductStage><Photo name="product-00.jpg" delay={7}/></ProductStage>
  </Frame>;
};

const Carriages:React.FC = () => <Frame index="02">
  <Copy eyebrow="НОСЕЩИ КОЛИЧКИ" title={'СТОМАНЕНИ\nРОЛКИ'} sub="Две носещи колички. Осем ролки на всяка.">
    <Metric label="В КОМПЛЕКТА" value="2 × 8"/>
  </Copy>
  <ProductStage><Photo name="product-02.jpg" delay={7}/></ProductStage>
</Frame>;

const Components:React.FC = () => {
  const {width,height}=useVideoConfig(), p=height>width;
  return <Frame index="03">
    <Copy eyebrow="КОМПЛЕКТЪТ В ДЕТАЙЛ" title={'РОЛКА +\nНАСРЕЩНИК'} sub="Основни компоненти за завършен монтаж."/>
    <ProductStage>
      <div style={{position:'absolute',left:0,top:p?10:20,width:'53%',height:'62%'}}><Photo name="product-04.jpg" delay={6}/></div>
      <div style={{position:'absolute',right:0,bottom:p?48:35,width:'54%',height:'66%'}}><Photo name="product-06.jpg" delay={15}/></div>
      <div style={{position:'absolute',left:25,bottom:p?0:0,fontFamily:'IronArt Mono',fontSize:p?24:19,color:'#5D636B'}}>ОРИГИНАЛНИ КОМПОНЕНТИ PSG</div>
    </ProductStage>
  </Frame>;
};

const Rail:React.FC = () => {
  const {width,height}=useVideoConfig(), p=height>width;
  return <Frame index="04">
    <Copy eyebrow="РЕЛСА 100 ММ" title={'ИЗБЕРИ\nДЪЛЖИНАТА'} sub="Конфигурация според твоя проект.">
      <Metric label="ДЪЛЖИНА НА РЕЛСАТА" value="6 / 9 / 12 м" size={p?83:78}/>
    </Copy>
    <ProductStage><Photo name="product-00.jpg" delay={7}/></ProductStage>
  </Frame>;
};

const Outro:React.FC = () => {
  const f=useCurrentFrame(), {width,height}=useVideoConfig(), p=height>width;
  const m=p?76:140, logoW=p?920:1050;
  return <AbsoluteFill style={{background:C.white,color:C.ink,fontFamily:'IronArt Sans',overflow:'hidden'}}>
    <div style={{position:'absolute',left:m,right:m,top:p?230:100,opacity:intro(f,3),transform:'translateY('+((1-intro(f,3))*35)+'px)'}}>
      <Logo width={logoW} style={{margin:'0 auto'}}/>
    </div>
    <div style={{position:'absolute',top:p?750:550,left:m,right:m,textAlign:'center',opacity:intro(f,12)}}>
      <div style={{fontSize:p?48:40,fontWeight:700,lineHeight:1.25,letterSpacing:-1}}>
        ТВОЯТ ПРОЕКТ. НАШАТА СИСТЕМА.
      </div>
      <div style={{fontSize:p?29:23,lineHeight:1.55,marginTop:p?38:24,color:'#5D636B'}}>
        Официален представител за България<br/>на PSG Group – Полша.
      </div>
    </div>
    <div style={{position:'absolute',left:p?130:640,right:p?130:640,top:p?1050:735,
      background:C.ink,color:C.white,padding:p?'29px 20px':'18px 20px',textAlign:'center',
      opacity:intro(f,20),transform:'translateY('+((1-intro(f,20))*20)+'px)'}}>
      <div style={{fontFamily:'IronArt Mono',fontSize:p?47:36,letterSpacing:1}}>IRONART.BG</div>
      <div style={{fontSize:p?22:17,marginTop:10,letterSpacing:1}}>ИЗБЕРИ СВОЯ КОМПЛЕКТ</div>
    </div>
    <div style={{position:'absolute',left:m,right:m,top:p?1370:900,textAlign:'center',opacity:intro(f,28)}}>
      <div style={{fontFamily:'IronArt Mono',fontSize:p?40:30,lineHeight:1.65}}>
        +359 886 277 577{p?<br/>:'   /   '}+359 895 868 565
      </div>
      <div style={{fontSize:p?28:22,color:'#5D636B',marginTop:p?30:12}}>office@ironart.bg</div>
    </div>
    <div style={{position:'absolute',bottom:p?150:45,left:m,right:m,height:2,background:C.steel}}>
      <div style={{height:'100%',width:(intro(f,35)*100)+'%',background:C.ink}}/>
    </div>
  </AbsoluteFill>;
};

export const IronArtPromo:React.FC<{silent?:boolean}> = ({silent=false}) => {
  const f=useCurrentFrame();
  return <AbsoluteFill style={{background:C.white}}>
    <Fonts/>
    {!silent && <Audio src={asset('music.mp3')} volume={interpolate(f,[0,25,735,779],[0,.72,.72,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}/>}
    <Sequence from={0} durationInFrames={90}><Intro/></Sequence>
    <Sequence from={90} durationInFrames={150}><Hero/></Sequence>
    <Sequence from={240} durationInFrames={120}><Carriages/></Sequence>
    <Sequence from={360} durationInFrames={120}><Components/></Sequence>
    <Sequence from={480} durationInFrames={120}><Rail/></Sequence>
    <Sequence from={600} durationInFrames={180}><Outro/></Sequence>
    <div style={{position:'absolute',left:0,bottom:0,height:5,width:(f/779*100)+'%',background:C.ink}}/>
  </AbsoluteFill>;
};
