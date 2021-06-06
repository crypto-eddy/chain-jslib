import ow from 'ow';
import { Msg } from '../../../cosmos/v1beta1/types/msg';
import { owMsgEditNFTOptions } from '../ow.types';
import { InitConfigurations } from '../../../core/cro';
import { AddressType, validateAddress } from '../../../utils/address';
import { CosmosMsg } from '../cosmosMsg';
import { COSMOS_MSG_TYPEURL } from '../../common/constants/typeurl';
import * as legacyAmino from '../../../cosmos/amino';

export const msgEditNFT = function (config: InitConfigurations) {
    return class MsgEditNFT implements CosmosMsg {
        /** MsgEditNFT id. */
        public id: string;

        /** MsgEditNFT denomId. */
        public denomId: string;

        /** MsgEditNFT name. */
        public name: string;

        /** MsgEditNFT uri. */
        public uri: string;

        /** MsgEditNFT data. */
        public data: string;

        /** MsgEditNFT sender. */
        public sender: string;

        /**
         * Constructor to create a new MsgEditNFT
         * @param {MsgEditNFTOptions} options
         * @returns {MsgEditNFT}
         * @throws {Error} when options is invalid
         */
        constructor(options: MsgEditNFTOptions) {
            ow(options, 'options', owMsgEditNFTOptions);

            this.id = options.id;
            this.name = options.name;
            this.sender = options.sender;
            this.denomId = options.denomId;
            this.uri = options.uri;
            this.data = options.data;

            this.validateAddresses();
        }

        /**
         * Returns the raw Msg representation of MsgEditNFT
         * @returns {Msg}
         */
        toRawMsg(): Msg {
            return {
                typeUrl: COSMOS_MSG_TYPEURL.nft.MsgEditNFT,
                value: {
                    id: this.id,
                    name: this.name,
                    sender: this.sender,
                    denomId: this.denomId,
                    uri: this.uri,
                    data: this.data,
                },
            };
        }

        // eslint-disable-next-line class-methods-use-this
        toRawAminoMsg(): legacyAmino.Msg {
            return {
                type: 'cosmos-sdk/MsgEditNFT',
                value: {
                    id: this.id,
                    name: this.name,
                    sender: this.sender,
                    denom_id: this.denomId,
                    uri: this.uri,
                    data: this.data,
                },
            } as legacyAmino.MsgEditNFT;
        }

        validateAddresses() {
            if (
                !validateAddress({
                    address: this.sender,
                    network: config.network,
                    type: AddressType.USER,
                })
            ) {
                throw new TypeError('Provided `sender` does not match network selected');
            }
        }
    };
};

export type MsgEditNFTOptions = {
    id: string;
    denomId: string;
    name: string;
    uri: string;
    data: string;
    sender: string;
};
