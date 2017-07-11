import CrunchyRoll from "../websites/crunchyroll";
import TraktWrapper from '../classes/trakt';

var wrap = new TraktWrapper(new CrunchyRoll());

wrap.printVideoInformation();