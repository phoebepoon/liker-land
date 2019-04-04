export const getUserInfo = state => state.user;
export const getUserId = state => state.user.user;
export const getUserIsCivicLikerTrial = state => !!state.user.isCivicLikerTrial;
export const getUserIsCivicLiker = state => !!state.user.isSubscribedCivicLiker;
export const getUserCivicLikerHalo = ({ user }) => {
  if (user.isCivicLikerTrial || user.isSubscribedCivicLiker) {
    return 'civic-liker';
  }
  return 'none';
};
export const getHomeRoute = state => ({
  name: state.user.user ? 'index-following' : 'index',
});
