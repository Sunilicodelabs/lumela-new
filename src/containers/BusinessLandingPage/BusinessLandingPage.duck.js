import { fetchPageAssets } from '../../ducks/hostedAssets.duck';
export const ASSET_NAME = 'business-landing-page';

export const loadData = (params, search) => dispatch => {
  const pageAsset = { businessLandingPage: `content/pages/${ASSET_NAME}.json` };
  console.log('pagerAssets', pageAsset)
  return dispatch(fetchPageAssets(pageAsset, true));
};
