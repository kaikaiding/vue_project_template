<template>
    <div>
        <v-card v-if="true" class="mb-2">
            <v-card-title>可樂娜問題</v-card-title>
            <v-card-text>
                <p>商店裡賣了三種玻璃瓶可樂娜，每種可樂娜皆有一個玻璃瓶+一個鐵蓋</p>
                <p>500ml可樂娜3元, 300ml可樂娜2元, 200ml可樂娜1元</p>
                <p>當季活動如下:</p>
                <p>累積喝滿1000ml可樂娜，即可免費贈送300ml可樂娜一罐</p>
                <p>累積任意3個玻璃瓶，即可免費贈送300ml可樂娜一罐</p>
                <p>累積任意3個鐵蓋，即可免費贈送200ml可樂娜一罐</p>
                <p>(贈送的可樂娜均含玻璃瓶+鐵蓋)</p>

                <p>
                    請用js實作，如果input=20元，最終可以得到xxx ml可樂娜?
                    並上傳github公開，再回傳github連結
                </p>

                <p>注意事項</p>

                <p>
                    有需要時，面試時須要透過分享畫面來解釋code的邏輯
                    若無git，請先註冊git帳號
                    請自行計時完成時間(建議自行透過畫面錄製來證明)
                </p>
            </v-card-text>
        </v-card>

        <v-card class="mb-2">
            <v-card-title>直接購買</v-card-title>
            <v-container>
                <v-row>
                    <v-col 
                        cols="12"
                    >
                        <v-text-field
                            label="準備的錢錢"
                            type="number"
                            min="0"
                            v-model="money"
                        ></v-text-field>
                    </v-col>

                    <v-col
                        cols="12"
                    >
                        <v-btn 
                            block
                            @click="get_total_ml()"
                        >
                            訂購
                        </v-btn>
                    </v-col>

                    <v-col
                        cols="12"
                    >
                        最終得到 {{ total_ml }} ml 可樂娜
                    </v-col>
                    
                    
                </v-row>
            </v-container>
        </v-card>

        <v-card class="mb-2">
            <v-card-title>購買</v-card-title>
            <v-container>
                <v-row>
                    <v-col 
                        v-for="item in items"
                        :key="item.id"
                        cols="4"
                    >
                        <v-text-field
                            :label="`${item.ml}ml可樂娜${item.price}元`"
                            type="number"
                            min="0"
                            v-model="bottle_count[item.id]"
                        ></v-text-field>
                    </v-col>

                    <v-col
                        cols="12"
                    >
                        <p>結帳金額：{{ bill }}</p>
                    </v-col>

                    <v-alert
                        v-if="money<bill"
                        dense
                        border="left"
                        type="error"
                    >
                        <strong>STOP!</strong> 你錢不夠誒
                    </v-alert>

                    <v-col
                        cols="12"
                    >
                        <p>累積 {{ ml_number }} ml</p>
                        <p>
                            累積 {{ bottle_number }} 玻璃瓶                
                            (<span 
                                v-for="item in items"
                                :key="item.id"
                            >
                                {{ item.ml }} ml : {{ bottle_count[item.id] }} 瓶
                            </span>)
                        </p>
                        <p>累積 {{ cap_number }} 瓶蓋</p>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>

        <v-card>
            <v-card-title>兌換</v-card-title>
            <v-container>
                <v-row>
                    <v-col
                        cols="12"
                    >
                        <h3>兌換</h3>
                    </v-col>

                    <v-col 
                        v-for="item in items"
                        :key="item.id"
                        cols="3"
                    >
                        <v-text-field
                            :label="`${item.ml}ml可樂娜`"
                            type="number"
                            min="0"
                            v-model="number_of_exchange[item.id]"
                        ></v-text-field>
                    </v-col>

                    <v-col 
                        cols="3"
                    >
                        <v-text-field
                            label="兌換瓶蓋"
                            type="number"
                            min="0"
                            v-model="number_of_exchange_caps"
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col
                        cols="6"
                    >
                        <p>兌換 {{ number_of_exchange_ml }} ml</p>
                        <p>兌換 {{ number_of_exchange_bottles }} 玻璃瓶</p>
                        <p>
                            <span 
                                v-for="item in items"
                                :key="item.id"
                            >
                                {{ item.ml }} ml : {{ number_of_exchange[item.id] }} 瓶
                            </span>
                        </p>
                        <p>兌換 {{ number_of_exchange_caps }} 瓶蓋</p>
                    </v-col>

                    <v-col
                        cols="6"
                    >
                        <p>活動回饋</p>
                        <p>
                            <span 
                                v-for="item in reword"
                                :key="item.id"
                            >
                                <p>
                                    品項：{{ item.text }} , 獲得 {{ item.item_ml }} ml
                                    <span v-if="item.id==='ml'">
                                        {{ Math.floor( number_of_exchange_ml / item.x) }} 瓶
                                    </span>
                                    <span v-if="item.id==='bottle'">
                                        {{ Math.floor( number_of_exchange_bottles / item.x) }} 瓶
                                    </span>
                                    <span v-if="item.id==='cap'">
                                        {{ Math.floor( number_of_exchange_caps / item.x)}} 瓶
                                    </span>
                                </p>
                            </span>
                        </p>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </div>
</template>

<script>
export default {
    data: () => ({
        money: 20,
        total_ml: 0,

        bottle_count: {
            size_500: 0,
            size_300: 0,
            size_200: 0,
        },

        number_of_exchange: {
            size_500: 0,
            size_300: 0,
            size_200: 0,
        },

        number_of_exchange_caps: 0,

        items: [
            {
                id: "size_500",
                ml: 500,
                price: 3,
            },

            {
                id: "size_300",
                ml: 300,
                price: 2,
            },

            {
                id: "size_200",
                ml: 200,
                price: 1,
            },
        ],

        reword: [
            {
                id: "ml",
                item_ml: 300,
                x: 1000,
                text: "累積喝滿1000ml可樂娜",
            },

            {
                id: "bottle",
                item_ml: 300,
                x: 3,
                text: "累積任意3個玻璃瓶",
            },

            {
                id: "cap",
                item_ml: 200,
                x: 3,
                text: "累積任意3個鐵蓋",
            }
        ]
    }),

    computed: {
        bill () {
            return this.items.reduce((sum, item) => sum + item.price * this.bottle_count[item.id], 0);
        },

        cap_number () {
            return Object.values(this.bottle_count).reduce((sum, count) => sum + parseFloat(count), 0);
        },

        bottle_number () {
            return Object.values(this.bottle_count).reduce((a, b) => a + parseFloat(b), 0);
        },

        ml_number () {
            return this.items.reduce((sum, item) => sum + item.ml * this.bottle_count[item.id], 0);
        },

        number_of_exchange_bottles () {
            return Object.values(this.number_of_exchange).reduce((sum, count) => sum + parseFloat(count), 0);
        },

        number_of_exchange_ml () {
            return this.items.reduce((sum, item) => sum + item.ml * this.number_of_exchange[item.id], 0);
        }
    },


    created: function() {
        this.get_total_ml();
    },

    methods: {     
        get_total_ml () {
            const first_count = this.get_first_count();
            let obj = { ...first_count, total_ml: first_count.ml };
            while (this.get_status(obj)) {
                obj = this.get_reword(obj);
            }

            this.total_ml = obj.total_ml;
        },

        get_first_count () {
            const count = this.money / 1;
            return {
                ml: count * 200,
                bottle: count,
                cap: count,
            };
        },

        get_status (obj) {
            return Boolean(obj.ml > 999 || obj.bottle > 2 || obj.cap > 2);
        },

        get_reword (obj) {
            const count = this.reword.reduce((sum, item) => 
                sum + Math.floor(obj[item.id] / item.x), obj.bottle % 3
            );
            const ml = this.reword.reduce((sum, item) => 
                sum + Math.floor(obj[item.id] / item.x) * item.item_ml, obj.ml % 1000
            );

            return {
                ml: ml,
                bottle: count,
                cap: count,
                total_ml: obj.total_ml + ml - (obj.ml % 1000)
            };
        },

    },
};
</script>

<style>

</style>
