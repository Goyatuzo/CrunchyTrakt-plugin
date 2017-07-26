import CrunchyRoll from "../websites/crunchyroll";
import TraktApi from '../trakt/trakt-api';

var t = new TraktApi(new CrunchyRoll());
t.authorize();