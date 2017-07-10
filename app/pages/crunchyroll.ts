import CrunchyRoll from "../websites/crunchyroll";
import TraktWrapper from '../classes/trakt';

var d = new CrunchyRoll();
var wrap = new TraktWrapper(d);

wrap.printSeriesName();