import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { APP_LIKE_CO_VIEW, APP_LIKE_CO_URL_BASE } from '~/constant';
import { getNFTHistory, getAddressLikerIdMinApi } from '~/util/api';

export default {
  data() {
    return {
      iscnOwnerInfo: {},
      NFTHistory: [],
      displayNameList: [],
      avatarList: [],
      civicLikerList: [],
    };
  },
  computed: {
    ...mapGetters([
      'getNFTClassPurchaseInfoById',
      'getNFTClassMetadataById',
      'getNFTClassOwnerInfoById',
      'getNFTClassOwnerCount',
      'getNFTClassMintedCount',
    ]),
    isCivicLiker() {
      return !!(
        this.iscnOwnerInfo &&
        (this.iscnOwnerInfo.isCivicLikerTrial ||
          this.iscnOwnerInfo.isSubscribedCivicLiker)
      );
    },
    NFTClassMetadata() {
      return this.getNFTClassMetadataById(this.classId) || {};
    },
    purchaseInfo() {
      return this.getNFTClassPurchaseInfoById(this.classId) || {};
    },
    ownerInfo() {
      return this.getNFTClassOwnerInfoById(this.classId) || {};
    },
    iscnId() {
      return this.NFTClassMetadata.iscn_id;
    },
    iscnOwner() {
      return this.NFTClassMetadata.iscn_owner;
    },
    iscnURL() {
      return `${APP_LIKE_CO_VIEW}/${encodeURIComponent(this.iscnId)}%2F1`;
    },
    // nft info
    NFTName() {
      return this.NFTClassMetadata.name;
    },
    NFTDescription() {
      return this.NFTClassMetadata.description;
    },
    NFTImageUrl() {
      return this.NFTClassMetadata.image;
    },
    NFTImageBackgroundColor() {
      return this.NFTClassMetadata.background_color;
    },
    NFTExternalUrl() {
      return this.NFTClassMetadata.external_url;
    },
    NFTPrice() {
      return this.purchaseInfo.price && this.purchaseInfo.price;
    },
    ownerList() {
      return this.getNFTClassOwnerInfoById(this.classId) || {};
    },
    ownerCount() {
      return this.getNFTClassOwnerCount(this.classId);
    },
    mintedCount() {
      return this.getNFTClassMintedCount(this.classId);
    },
    purchaseURL() {
      return `${APP_LIKE_CO_URL_BASE}/nft/purchase/${encodeURIComponent(
        this.iscnId
      )}%2F1`;
    },
  },
  methods: {
    ...mapActions([
      'fetchNFTPurchaseInfo',
      'fetchNFTMetadata',
      'fetchNFTOwners',
    ]),
    updateNFTData() {
      this.updateNFTClassMetdata();
      this.updateNFTPurchaseInfo();
      this.updateNFTOwners();
    },
    async updateNFTClassMetdata() {
      await this.fetchNFTMetadata(this.classId);
      this.updateDisplayNameList(
        this.getNFTClassMetadataById(this.classId)?.iscn_owner
      );
    },
    async updateNFTPurchaseInfo() {
      await this.fetchNFTPurchaseInfo(this.classId);
    },
    async updateNFTOwners() {
      await this.fetchNFTOwners(this.classId);
      this.updateDisplayNameList(
        Object.keys(this.getNFTClassOwnerInfoById(this.classId))
      );
    },
    async updateNFTHistory() {
      const { data } = await this.$api.get(
        getNFTHistory({ classId: this.classId })
      );
      this.NFTHistory = data.list;
      const array = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const list of data.list) {
        array.push(list.fromWallet, list.toWallet);
      }
      this.updateDisplayNameList([...new Set(array)]);
    },
    updateDisplayNameList(addresses) {
      if (typeof addresses === 'string') {
        return this.getAddressLikerId(addresses);
      }
      return Promise.all(addresses.map(this.getAddressLikerId));
    },
    async getAddressLikerId(addr) {
      try {
        const { data } = await this.$api.get(getAddressLikerIdMinApi(addr));
        Vue.set(this.displayNameList, addr, data.displayName);
        Vue.set(
          this.avatarList,
          addr,
          data.avatar ||
            `https://avatars.dicebear.com/api/identicon/${addr}.svg`
        );
        Vue.set(this.civicLikerList, addr, true);
      } catch (error) {
        Vue.set(this.displayNameList, addr, addr);
        Vue.set(
          this.avatarList,
          addr,
          `https://avatars.dicebear.com/api/identicon/${addr}.svg`
        );
      }
    },
  },
};
