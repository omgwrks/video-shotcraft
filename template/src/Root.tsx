import { Composition } from 'remotion';
import { AIFL_TOTAL } from './aifl/Main';
import { ThemedFilm } from './themes/ThemedFilm';
import { IronArtPromo, IRONART_DURATION } from './ironart/Promo';

export const Root: React.FC = () => (
  <>
    <Composition id="AiflPromo" component={ThemedFilm} defaultProps={{theme:'ink-press'}}
      durationInFrames={AIFL_TOTAL} fps={30} width={1920} height={1080}/>
    <Composition id="IronArtLandscape" component={IronArtPromo}
      durationInFrames={IRONART_DURATION} fps={30} width={1920} height={1080}/>
    <Composition id="IronArtPortrait" component={IronArtPromo}
      durationInFrames={IRONART_DURATION} fps={30} width={1080} height={1920}/>
  </>
);
