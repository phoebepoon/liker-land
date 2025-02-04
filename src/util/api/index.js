import querystring from 'querystring';
import {
  CIVIC_LIKER_CLASSIC_LIKER_ID,
  EXTERNAL_HOST,
  LIKECOIN_API_BASE,
  LIKECOIN_CHAIN_VIEW_TX,
  LIKECOIN_CHAIN_API,
  LIKE_CO_THUMBNAIL_FN_BASE,
  LIKECOIN_NFT_API_WALLET,
} from '../../constant';
import { normalizeLocaleForLikeCo } from '../../locales';

export const getAppURL = ({
  referrer,
  utmCampaign,
  utmSource = 'likerland',
  utmMedium,
} = {}) => {
  if (referrer) {
    const queryObject = {
      event: 'app_referral',
      referrer,
      '~campaign': utmCampaign,
      '~channel': utmSource,
      '~feature': utmMedium,
    };
    return `https://likerland.app.link/?${querystring.stringify(queryObject)}`;
  }
  const queryObject = {
    utm_campaign: utmCampaign,
    utm_source: utmSource,
    utm_medium: utmMedium,
  };
  return `https://likecoin.page.link/likerland?${querystring.stringify(
    queryObject
  )}`;
};

export const getOAuthRegisterAPI = ({
  language = 'zh',
  from = '',
  referrer = '',
  utmSource = '',
} = {}) =>
  `/api/users/register?${querystring.stringify({
    language: normalizeLocaleForLikeCo(language),
    from,
    referrer,
    utm_source: utmSource,
  })}`;
export const getOAuthLoginAPI = ({ language = 'zh', utmSource } = {}) =>
  `/api/users/login?${querystring.stringify({
    language: normalizeLocaleForLikeCo(language),
    utm_source: utmSource,
  })}`;
export const getOAuthCallbackAPI = () => `/api/users/login`;
export const getLoginStatus = () => `/api/users/self`;
export const getLogoutAPI = () => `/api/users/logout`;
export const getCivicLikerStakingAPI = address =>
  `/api/civic/staking?address=${address}`;
export const getCivicLikerStakingInfoAPI = () => '/api/civic/staking/info';

export const getImageResizeAPI = (url, { width } = {}) =>
  `${LIKE_CO_THUMBNAIL_FN_BASE}/thumbnail/?url=${encodeURIComponent(url)}${
    width ? `&width=${width}` : ''
  }`;
export const getUserMinAPI = (id, { types = [] } = {}) =>
  `${LIKECOIN_API_BASE}/users/id/${id}/min?${querystring.stringify({
    type: types.join(','),
  })}`;
export const getUserInfoMinByAddress = addr =>
  `${LIKECOIN_API_BASE}/users/addr/${addr}/min`;
export const getArticleDetailAPI = ({ url = '', iscnId = '' }) =>
  `${LIKECOIN_API_BASE}/like/info?iscn_id=${encodeURIComponent(
    iscnId
  )}&url=${encodeURIComponent(url)}`;

export const userPreferences = () => `/api/users/preferences`;

export const getLikerOgImage = id =>
  id === CIVIC_LIKER_CLASSIC_LIKER_ID
    ? 'https://liker.land/images/og/civic-classic.png'
    : `https://static.like.co/liker-og-image/${id}.png`;

export const getNFTMintInfo = ({ iscnId, classId }) => {
  const qsPayload = {
    iscn_id: iscnId,
    class_id: classId,
  };
  return `${LIKECOIN_API_BASE}/likernft/mint?${querystring.stringify(
    qsPayload
  )}`;
};

export const getNFTPurchaseInfo = ({ iscnId, classId }) => {
  const qsPayload = {
    iscn_id: iscnId,
    class_id: classId,
  };
  return `${LIKECOIN_API_BASE}/likernft/purchase?${querystring.stringify(
    qsPayload
  )}`;
};

export const getNFTHistory = ({ iscnId, classId, nftId, txHash }) => {
  const qsPayload = {
    iscn_id: iscnId,
    class_id: classId,
    nft_id: nftId,
    tx_hash: txHash,
  };
  return `${LIKECOIN_API_BASE}/likernft/history?${querystring.stringify(
    qsPayload
  )}`;
};

export const getNFTMetadata = ({ iscnId, classId, nftId }) => {
  const qsPayload = {
    iscn_id: iscnId,
    class_id: classId,
    nft_id: nftId,
  };
  return `${LIKECOIN_API_BASE}/likernft/metadata?${querystring.stringify(
    qsPayload
  )}`;
};

export const getNFTModel = ({ classId }) =>
  `${LIKECOIN_API_BASE}/likernft/metadata/model/class_${classId}.gltf`;

export const getUserNFTStats = wallet =>
  `${LIKECOIN_API_BASE}/likernft/user/${wallet}/stats`;

export const getLIKEPrice = () =>
  `https://api.coingecko.com/api/v3/simple/price?ids=likecoin&vs_currencies=usd`;

export const getChainExplorerTx = hash => `${LIKECOIN_CHAIN_VIEW_TX}/${hash}`;

export const getChainRawTx = hash =>
  `${LIKECOIN_CHAIN_API}/cosmos/tx/v1beta1/txs/${hash}`;

export const getChainNFTClassMetadataEndpoint = classId =>
  `${LIKECOIN_CHAIN_API}/cosmos/nft/v1beta1/classes/${classId}`;

export const getChainNFTMetadataEndpoint = (classId, nftId) =>
  `${LIKECOIN_CHAIN_API}/cosmos/nft/v1beta1/nfts/${classId}/${nftId}`;

export const getTopCollectorOfUser = (creator, count = 5) =>
  `${LIKECOIN_CHAIN_API}/likechain/likenft/v1/collector?pagination.limit=${count}&price_by=nft&creator=${creator}&ignore_list=${LIKECOIN_NFT_API_WALLET}&include_owner=false`;

export const getTopCreatorOfUser = (collector, count = 5) =>
  `${LIKECOIN_CHAIN_API}/likechain/likenft/v1/creator?pagination.limit=${count}&price_by=nft&collector=${collector}&ignore_list=${LIKECOIN_NFT_API_WALLET}&include_owner=false`;

export const getChainNFTClassListingEndpoint = classId =>
  `${LIKECOIN_CHAIN_API}/likechain/likenft/v1/listings/${classId}`;

export const getCollectorTopRankedCreators = (collector, top = 5) =>
  `${LIKECOIN_CHAIN_API}/likechain/likenft/v1/collector-top-ranked-creators?collector=${collector}&ignore_list=${LIKECOIN_NFT_API_WALLET}&include_owner=false&top=${top}`;

export const getISCNRecord = iscnId => {
  const qsPayload = {
    iscn_id: iscnId,
  };
  return `${LIKECOIN_CHAIN_API}/iscn/records/id?${querystring.stringify(
    qsPayload
  )}`;
};

export const getNFTClassesPartial = ({ owner, reverse, limit, key }) => {
  const qsPayload = {
    iscn_owner: owner,
    reverse,
  }; // TODO: support account based query
  if (limit) qsPayload['pagination.limit'] = limit;
  if (key) qsPayload['pagination.key'] = key;
  return `${LIKECOIN_CHAIN_API}/likechain/likenft/v1/class?${querystring.stringify(
    qsPayload
  )}`;
};

export const getNFTsPartial = ({ owner, expandClasses, limit, key }) => {
  const qsPayload = { owner };
  if (expandClasses) qsPayload.expand_classes = 1;
  if (limit) qsPayload['pagination.limit'] = limit;
  if (key) qsPayload['pagination.key'] = key;
  return `${LIKECOIN_CHAIN_API}/likechain/likenft/v1/nft?${querystring.stringify(
    qsPayload
  )}`;
};

export const getNFTOwners = classId => {
  const qsPayload = {
    class_id: classId,
  };
  return `${LIKECOIN_CHAIN_API}/likechain/likenft/v1/owner?${querystring.stringify(
    qsPayload
  )}`;
};

export const getNFTEvents = ({
  classId,
  nftId,
  sender,
  receiver,
  creator,
  involver,
  limit,
  key,
  actionType,
  ignoreToList,
  ignoreFromList,
  reverse,
}) => {
  const qsPayload = {};
  if (classId) qsPayload.class_id = classId;
  if (nftId) qsPayload.nft_id = nftId;
  if (sender) qsPayload.sender = sender;
  if (creator) qsPayload.creator = creator;
  if (receiver) qsPayload.receiver = receiver;
  if (involver) qsPayload.involver = involver;
  if (actionType) qsPayload.action_type = actionType;
  if (ignoreToList) qsPayload.ignore_to_list = ignoreToList;
  if (ignoreFromList) qsPayload.ignore_from_list = ignoreFromList;
  if (key) qsPayload['pagination.key'] = key;
  if (limit) qsPayload['pagination.limit'] = limit;
  if (reverse) qsPayload['pagination.reverse'] = reverse;
  return `${LIKECOIN_CHAIN_API}/likechain/likenft/v1/event?${querystring.stringify(
    qsPayload
  )}`;
};

export const postNFTPurchase = ({ txHash, iscnId, classId, ts }) => {
  const qsPayload = {
    tx_hash: txHash,
    iscn_id: iscnId,
    class_id: classId,
    ts,
  };
  return `${LIKECOIN_API_BASE}/likernft/purchase?${querystring.stringify(
    qsPayload
  )}`;
};

export const postNFTTransfer = ({ txHash, classId, nftId }) => {
  const qsPayload = {
    class_id: classId,
    tx_hash: txHash,
    nft_id: nftId,
  };
  return `${LIKECOIN_API_BASE}/likernft/transfer?${querystring.stringify(
    qsPayload
  )}`;
};

export const postNewStripeFiatPayment = ({ classId, wallet }) => {
  const qsPayload = {
    class_id: classId,
    wallet,
  };
  return `${LIKECOIN_API_BASE}/likernft/fiat/stripe/new?${querystring.stringify(
    qsPayload
  )}`;
};

export const getStripeFiatPaymentStatus = ({ paymentId }) => {
  const qsPayload = {
    payment_id: paymentId,
  };
  return `${LIKECOIN_API_BASE}/likernft/fiat/stripe/status?${querystring.stringify(
    qsPayload
  )}`;
};

export const getStripeFiatPrice = ({ classId }) => {
  const qsPayload = {
    class_id: classId,
  };
  return `${LIKECOIN_API_BASE}/likernft/fiat/stripe/price?${querystring.stringify(
    qsPayload
  )}`;
};

export const getTopNFTClasses = ({ before, after }) => {
  const qsPayload = {
    ignore_list: LIKECOIN_NFT_API_WALLET,
  };
  if (after !== undefined) qsPayload.after = after;
  if (before !== undefined) qsPayload.before = before;
  return `${LIKECOIN_CHAIN_API}/likechain/likenft/v1/ranking?${querystring.stringify(
    qsPayload
  )}`;
};

export const getIdenticonAvatar = id =>
  `https://avatars.dicebear.com/api/identicon/${id}.svg?background=%23ffffff`;

export const nftMintSubscriptionAPI = ({ id, email, wallet, language }) => {
  const qsPayload = { email, wallet, language };
  return `${EXTERNAL_HOST}/api/nft/mint-subscription${
    id ? `/${id}` : ''
  }?${querystring.stringify(qsPayload)}`;
};

export const getUserV2Self = () => '/api/v2/users/self';
export const postUserV2Login = () => '/api/v2/users/login';
export const postUserV2Logout = () => '/api/v2/users/logout';

export const postUserV2WalletEmail = ({ email, followee }) => {
  const qsPayload = { email, followee };
  return `/api/v2/users/email?${querystring.stringify(qsPayload)}`;
};
export const putUserV2WalletEmail = ({ wallet, token, followee }) => {
  const qsPayload = { wallet, token, followee };
  return `/api/v2/users/email?${querystring.stringify(qsPayload)}`;
};

export const updateEventLastSeen = () => `/api/v2/users/event/seen`;

export const getUserV2DisplayState = wallet =>
  `/api/v2/users/${wallet}/nfts/display-state`;

export const postUserV2DisplayState = wallet =>
  `/api/v2/users/${wallet}/nfts/display-state`;
export const getUserV2LocaleURL = () => `/api/v2/users/locale`;
export const getUserV2Followees = () => `/api/v2/users/followees`;
export const getUserV2Followers = () => `/api/v2/users/followers`;
export const postUserV2Followees = creator => {
  const qsPayload = { creator };
  return `/api/v2/users/followees?${querystring.stringify(qsPayload)}`;
};
export const deleteUserV2Followees = creator => {
  const qsPayload = { creator };
  return `/api/v2/users/followees?${querystring.stringify(qsPayload)}`;
};
export const getUserFollowees = wallet => `/api/v2/users/${wallet}/followees`;
export const postFollowCreator = ({ wallet, creator }) =>
  `/api/v2/users/${wallet}/followers?creator=${creator}`;
export const getUserNotificationSettingsUrl = () =>
  `/api/v2/users/notification`;
