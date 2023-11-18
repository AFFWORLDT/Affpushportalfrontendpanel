import { getResFromLocalStorage } from "../service/localStorage";

const user = getResFromLocalStorage();
const account = {
  affiliate_id: user?.data.affiliate_id,
  displayName: user?.data.name,
  email: user?.data.email,
  photoURL: user?.data.profile_pic,
  bio: user?.data.bio,
  created_at: user?.data.created_at,
  iframe_campaign_id: user?.data.iframe_campaign_id,
  level: user?.data.level,
  verified: user?.data.verified,

};

export default account;
