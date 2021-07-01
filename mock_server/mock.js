let http = require('http');
let url = require('url');

let host = '127.0.0.1'
let port = 12345;

let cors = require('cors')
let express = require('express')

let app = express()
app.use(cors())

let session = require('express-session');

let bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));


app.use('/public_auth_key/', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Request-Method', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method == 'POST') {
        var auth_key = req.body.auth_key;
        req.session.is_public = auth_key; 
        res.send({"status": "success", "failed_code": ""});
    }
})  

app.get('/public/', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Request-Method', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    //res.render('index', {});
    res.send({"is_auth": true, "is_staff":false, 'name':'taoyuan', 'is_private':false});
    //res.sendFile('../index.html');
    
}) 


app.use('/logout/', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Request-Method', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method == 'POST') {
        res.send({"status": "success"});
    }
})  

app.use('/login/', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Request-Method', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method == 'POST') {
        if (req.body.username == 'ccc' && req.body.password == 'cccc') {
            res.send({"status": "success", "name":"ccc", "is_staff":true, "is_auth":true });
        } else {
            res.send({"status": "success", "is_staff":false, "is_auth":false });
        }
    }
})
app.use('/user_signup/', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Request-Method', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method == 'POST') {
        if (req.body.account != 'sunday') {
            res.send({
                "status": "success", 
                "data": "註冊成功",
            });
        } else {
            res.send({"status": "failed", "failed_message": "帳號重複"});
        }
    }
})
app.use('/user_logout/', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Request-Method', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method == 'POST') {
        res.send({
            "status": "success",
        });
    }
})

app.use('/user_login/', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Request-Method', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method == 'POST') {
        if (req.body.account == 'sunday' && req.body.password == '111') {
            res.send({
                "status": "success", 
                "data": {
                    "account": "sunday", 
                    "name": "Sunny", 
                    "group_names": ["海象中心"],
                    "level": "user",
                    "status": "啟用",
                    "work_unit": "weather",
                    "email": "email@email.com"
                },
            });
        } else if(req.body.account == 'admin' && req.body.password == 'admin') {
            res.send({
                "status": "success", 
                "data": {
                    "account": "admin", 
                    "name": "admin", 
                    "group_names": [],
                    "level": "admin",
                    "status": "啟用",
                    "work_unit": "weather",
                    "email": "email@email.com"
                },
            });
        }else {
            if(req.body.account != 'sunday') {
                res.send({"status": "failed", "failed_message": "無此帳號"});
                return;
            }
            if(req.body.password != '111') {
                res.send({"status": "failed", "failed_message": "密碼錯誤"});
                return;
            }
        }
    }
})
app.use('/cls/', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Request-Method', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method == 'POST') {
            // res.send({
            //     "status": "success", 
            //     "data": 
            //     {
            //         "account": "sunday", 
            //         "name": "Sunny", 
            //         "group_names": ["海象中心"],
            //         "level": "user",
            //         "status": "啟用",
            //     },
            // });
            res.send({
                "status": "success", 
                "data": 
                {
                    "account": "admin", 
                    "name": "admin", 
                    "group_names": ["海象中心"],
                    "level": "user",
                    "status": "啟用",
                    "work_unit": "weather",
                    "email": "email@email.com"
                },
            });
            // res.send({
            //     "status": "failed", 
            // });
    }
})
app.use('/update_user_info/', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Request-Method', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method == 'POST') {
            res.send({
                "status": "success", 
            });
            // res.send({"status": "failed", "failed_message": "驗證錯誤"});
    }
})
app.use('/forgot_password/', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Request-Method', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method == 'POST') {
        if (req.body.account == 'sunny' && req.body.email == 'sun@qqq.com' && req.body.verify_code == '1234') {
            res.send({
                "status": "success",
            });
        } else {
            res.send({"status": "failed", "failed_message": "驗證錯誤"});
        }
    }
})
app.use('/send_verify_code/', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Request-Method', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method == 'POST') {
        if (req.body.account == 'sunny' && req.body.email == 'sun@qqq.com') {
            res.send({
                "status": "success",
            });
        } else {
            res.send({"status": "failed", "failed_message": "資訊錯誤"});
        }
    }
})
app.use('/change_password/', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Request-Method', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method == 'POST') {
        if (req.body.account == 'sunny' && req.body.email == 'sun@qqq.com' && req.body.verify_code == '1234'  ) {
            res.send({
                "status": "success",
            });
        } else {
            res.send({"status": "failed", "failed_message": "資訊錯誤"});
        }
    }
})

app.use('/get_all_user/', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Request-Method', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method == 'POST') {
        res.send({
            "status": "success",
            "users": [
                {
                    "account": "admin", 
                    "name": "admin", 
                    "work_unit": "weather",
                    "email": "ad@qqq.com",
                    "group_names": [],
                    "level": "admin",
                    "status": "啟用",
                },
                {
                    "account": "sunday", 
                    "name": "Sunny", 
                    "work_unit": "weather",
                    "email": "sun@qqq.com",
                    "group_names": ["預報員"],
                    "level": "user",
                    "status": "啟用",
                },
                {
                    "account": "sunday1", 
                    "name": "Sunny1", 
                    "work_unit": "weather",
                    "email": "sun1@qqq.com",
                    "group_names": ["海象中心"],
                    "level": "user",
                    "status": "啟用",
                },
                {
                    "account": "sunday2", 
                    "name": "Sunny2", 
                    "work_unit": "weather",
                    "email": "sun2@qqq.com",
                    "group_names": ["預報員"],
                    "level": "user",
                    "status": "停用",
                },
                {
                    "account": "sunday3", 
                    "name": "Sunny3", 
                    "work_unit": "weather",
                    "email": "sun3@qqq.com",
                    "group_names": [],
                    "level": "user",
                    "status": "未審核",
                },
            ],
        });
    }
})
app.use('/get_all_group/', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Request-Method', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method == 'POST') {
        res.send({
            "status": "success",
            "groups":[
                {
                    "name": "海象中心",
                    "stids":[
                        "傳送官網設定",
                        "網站顯示測站設定",
                        "傳送報潮水位設定",
                        "帳號管理"
                    ],
                    "function_list": [
                        "傳送水位至資料課",
                        "傳送颱風期間圖檔(zip),傳送圖檔至CEOC,傳送KMZ至NCDR",
                        "傳送颱風期間,不含表格圖檔(zip)",
                        "傳送非颱風期間圖檔(zip)",
                    ],
                },
                {
                    "name": "測試空值",
                    "stids":[""
                    ],
                    "function_list": [""
                    ],
                },
            ],
        });
    }
})
app.use('/change_user_status/', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Request-Method', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method == 'POST') {
        if (req.body.account == 'sunday') {
            res.send({
                "status": "success",
            });
        } else {
            res.send({"status": "failed", "failed_message": "改變狀態錯誤"});
        }
    }
})
app.use('/change_user_group/', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Request-Method', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method == 'POST') {
        if (req.body.account == 'sunday') {
            res.send({
                "status": "success",
            });
        } else {
            res.send({"status": "failed", "failed_message": "改變群組錯誤"});
        }
    }
})
app.use('/add_group/', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Request-Method', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method == 'POST') {
        
        res.send({
            "status": "success",
        });
    }
})

app.use('/register/', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Request-Method', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method == 'POST') {
        if (req.body.user == 'ccc' && req.body.password == 'cccc') {
            res.send({"status": "failed", "failed_code": "username" });
        } else {
            res.send({"status": "success" });
        }
    }
}
)

//app authority end

// 共用
app.use('/load_station_data/', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Request-Method', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method == 'POST') {
        res.send(
          {"status": "success", "failed_code": "", "data": {"station_list": [{"stid": "1102", "stnac": "\u6de1\u6c34", "stnae": "Danshui", "key": "W14", "order": 14, "sent_water_level_type": "surge_model"}, {"stid": "1116", "stnac": "\u7af9\u570d", "stnae": "Dayuan", "key": "W15", "order": 15, "sent_water_level_type": "surge_model"}, {"stid": "112", "stnac": "\u65b0\u7af9", "stnae": "Hsinchu", "key": "W16", "order": 16, "sent_water_level_type": "surge_model"}, {"stid": "113", "stnac": "\u5916\u57d4", "stnae": "Waipu", "key": "W17", "order": 17, "sent_water_level_type": "surge_model"}, {"stid": "1156", "stnac": "\u81fa\u897f", "stnae": "Taixi", "key": "W21", "order": 21, "sent_water_level_type": "surge_model"}, {"stid": "1166", "stnac": "\u6771\u77f3", "stnae": "Dongshi", "key": "W22", "order": 22, "sent_water_level_type": "surge_model"}, {"stid": "1176", "stnac": "\u5c07\u8ecd", "stnae": "Jiangjun", "key": "W23", "order": 23, "sent_water_level_type": "surge_model"}, {"stid": "1186", "stnac": "\u6771\u6e2f", "stnae": "Donggang", "key": "W27", "order": 27, "sent_water_level_type": "surge_model"}, {"stid": "1196", "stnac": "\u5f8c\u58c1\u6e56", "stnae": "South Bay", "key": "W30", "order": 30, "sent_water_level_type": "surge_model"}, {"stid": "1206", "stnac": "\u9e9f\u5c71\u9f3b", "stnae": "Shimen", "key": "W13", "order": 13, "sent_water_level_type": "surge_model"}, {"stid": "1226", "stnac": "\u9f8d\u6d1e", "stnae": "Longdong", "key": "W1", "order": 1, "sent_water_level_type": "surge_model"}, {"stid": "1236", "stnac": "\u70cf\u77f3", "stnae": "Tsucheng", "key": "W4", "order": 4, "sent_water_level_type": "surge_model"}, {"stid": "1246", "stnac": "\u8607\u6fb3", "stnae": "Suao", "key": "W5", "order": 5, "sent_water_level_type": "surge_model"}, {"stid": "1256", "stnac": "\u82b1\u84ee", "stnae": "Hualien", "key": "W6", "order": 6, "sent_water_level_type": "surge_model"}, {"stid": "1276", "stnac": "\u6210\u529f", "stnae": "Chenggong", "key": "W8", "order": 8, "sent_water_level_type": "surge_model"}, {"stid": "1356", "stnac": "\u6f8e\u6e56", "stnae": "Penghu", "key": "W32", "order": 32, "sent_water_level_type": "surge_model"}, {"stid": "1386", "stnac": "\u5c0f\u7409\u7403", "stnae": "XiaoLiuqiu", "key": "W31", "order": 31, "sent_water_level_type": "surge_model"}, {"stid": "1396", "stnac": "\u862d\u5dbc", "stnae": "Lanyu", "key": "W12", "order": 12, "sent_water_level_type": "surge_model"}, {"stid": "1436", "stnac": "\u81fa\u4e2d\u6e2f", "stnae": "Wuqi", "key": "W18", "order": 18, "sent_water_level_type": "surge_model"}, {"stid": "1446", "stnac": "\u82b3\u82d1", "stnae": "Fangyuan", "key": "W19", "order": 19, "sent_water_level_type": "surge_model"}, {"stid": "1456", "stnac": "\u9ea5\u5bee", "stnae": "Mailiao", "key": "W20", "order": 20, "sent_water_level_type": "surge_model"}, {"stid": "1473", "stnac": "\u5b89\u5e73", "stnae": "Anping", "key": "W24", "order": 24, "sent_water_level_type": "surge_model"}, {"stid": "1486", "stnac": "\u9ad8\u96c4", "stnae": "Kaohsiung", "key": "W26", "order": 26, "sent_water_level_type": "surge_model"}, {"stid": "1496", "stnac": "\u87f3\u5ee3\u5634", "stnae": "Xunguangzuei", "key": "W29", "order": 29, "sent_water_level_type": "surge_model"}, {"stid": "1516", "stnac": "\u57fa\u9686", "stnae": "Keelung", "key": "W2", "order": 2, "sent_water_level_type": "surge_model"}, {"stid": "1566", "stnac": "\u77f3\u68af", "stnae": "Shiti", "key": "W7", "order": 7, "sent_water_level_type": "surge_model"}, {"stid": "1586", "stnac": "\u81fa\u6771", "stnae": "Taitung", "key": "W9", "order": 9, "sent_water_level_type": "surge_model"}, {"stid": "1596", "stnac": "\u5927\u6b66", "stnae": "Dawu", "key": "W10", "order": 10, "sent_water_level_type": "surge_model"}, {"stid": "1676", "stnac": "\u7da0\u5cf6", "stnae": "Ludao", "key": "W11", "order": 11, "sent_water_level_type": "surge_model"}, {"stid": "1786", "stnac": "\u6c38\u5b89", "stnae": "Yongan", "key": "W25", "order": 25, "sent_water_level_type": "surge_model"}, {"stid": "1795", "stnac": "\u5609\u548c", "stnae": "Jiahe", "key": "W28", "order": 28, "sent_water_level_type": "surge_model"}, {"stid": "1826", "stnac": "\u798f\u9686", "stnae": "Fulong", "key": "W3", "order": 3, "sent_water_level_type": "surge_model"}, {"stid": "1926", "stnac": "\u99ac\u7956", "stnae": "Matsu", "key": "W34", "order": 34, "sent_water_level_type": "surge_model"}, {"stid": "1956", "stnac": "\u6599\u7f85\u7063", "stnae": "Kinmen", "key": "W33", "order": 33, "sent_water_level_type": "surge_model"}], "show_on_web": ["1102", "1116", "112", "113", "1156", "1166", "1176", "1186", "1196", "1206", "1226", "1236", "1246", "1256", "1276", "1356", "1386", "1396", "1436", "1446", "1456", "1473", "1486", "1496", "1516", "1566", "1586", "1596", "1676", "1786", "1795", "1826", "1926", "1956"], "sent_to_web": ["1102", "1156", "1176", "1256", "1356", "1486", "1516", "1586"], "regional_station_list": [{"area_id": 2, "text": "\u57fa\u9686\u5730\u5340", "selected_station": "1516", "stations": [{"stid": "1226", "text": "\u9f8d\u6d1e"}, {"stid": "1516", "text": "\u57fa\u9686"}, {"stid": "1826", "text": "\u798f\u9686"}]}, {"area_id": 6, "text": "\u82b1\u84ee\u5730\u5340", "selected_station": "1256", "stations": [{"stid": "1256", "text": "\u82b1\u84ee"}, {"stid": "1566", "text": "\u77f3\u68af"}]}, {"area_id": 9, "text": "\u81fa\u6771\u5730\u5340", "selected_station": "1586", "stations": [{"stid": "1276", "text": "\u6210\u529f"}, {"stid": "1586", "text": "\u81fa\u6771"}, {"stid": "1596", "text": "\u5927\u6b66"}]}, {"area_id": 14, "text": "\u6de1\u6c34\u5730\u5340", "selected_station": "1102", "stations": [{"stid": "1102", "text": "\u6de1\u6c34"}, {"stid": "1206", "text": "\u9e9f\u5c71\u9f3b"}]}, {"area_id": 21, "text": "\u81fa\u897f\u5730\u5340", "selected_station": "1156", "stations": [{"stid": "1156", "text": "\u81fa\u897f"}, {"stid": "1456", "text": "\u9ea5\u5bee"}]}, {"area_id": 23, "text": "\u5c07\u8ecd\u5730\u5340", "selected_station": "1176", "stations": [{"stid": "1166", "text": "\u6771\u77f3"}, {"stid": "1176", "text": "\u5c07\u8ecd"}]}, {"area_id": 26, "text": "\u9ad8\u96c4\u5730\u5340", "selected_station": "1486", "stations": [{"stid": "1186", "text": "\u6771\u6e2f"}, {"stid": "1486", "text": "\u9ad8\u96c4"}]}, {"area_id": 32, "text": "\u6f8e\u6e56\u5730\u5340", "selected_station": "1356", "stations": [{"stid": "1356", "text": "\u6f8e\u6e56"}]}]}}
        );
    }
})

// stationSet.js
app.use('/update_official_station/', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Request-Method', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method == 'POST') {
        res.send({
            "status": "success",
            "failed_code": "",
        });
    }
})

app.use('/update_web_station/', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Request-Method', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method == 'POST') {
        res.send({
            "status": "success",
            "failed_code": "",
        });
    }
})

app.use('/update_model_station/', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Request-Method', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method == 'POST') {
        res.send({
            "status": "success",
            "failed_code": "",
        });
    }
})

// main.js
app.use('/load_all_data/', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Request-Method', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method == 'POST') {
        res.send(
            {"status": "success", "failed_code": "", "data": {"1226": {"getWarn": 1.3, "getAtte": 0.73, "obs_water_level": [{"time": "2020-06-29 14:00", "val": 0.327}, {"time": "2020-06-29 15:00", "val": 0.298}, {"time": "2020-06-29 16:00", "val": 0.248}, {"time": "2020-06-29 17:00", "val": 0.198}, {"time": "2020-06-29 18:00", "val": 0.104}, {"time": "2020-06-29 19:00", "val": 0.03}, {"time": "2020-06-29 20:00", "val": -0.008}, {"time": "2020-06-29 21:00", "val": -0.007}, {"time": "2020-06-29 22:00", "val": 0.068}, {"time": "2020-06-29 23:00", "val": 0.19}, {"time": "2020-06-30 00:00", "val": 0.351}, {"time": "2020-06-30 01:00", "val": 0.452}, {"time": "2020-06-30 02:00", "val": 0.458}], "harmonic": [{"time": "2020-06-29 20:00", "val": -0.041}, {"time": "2020-06-29 21:00", "val": -0.017}, {"time": "2020-06-29 22:00", "val": 0.068}, {"time": "2020-06-29 23:00", "val": 0.183}, {"time": "2020-06-30 00:00", "val": 0.31}, {"time": "2020-06-30 01:00", "val": 0.433}, {"time": "2020-06-30 02:00", "val": 0.514}, {"time": "2020-06-30 03:00", "val": 0.532}, {"time": "2020-06-30 04:00", "val": 0.497}, {"time": "2020-06-30 05:00", "val": 0.423}, {"time": "2020-06-30 06:00", "val": 0.316}, {"time": "2020-06-30 07:00", "val": 0.176}, {"time": "2020-06-30 08:00", "val": 0.032}, {"time": "2020-06-30 09:00", "val": -0.069}, {"time": "2020-06-30 10:00", "val": -0.101}, {"time": "2020-06-30 11:00", "val": -0.064}, {"time": "2020-06-30 12:00", "val": 0.018}, {"time": "2020-06-30 13:00", "val": 0.125}, {"time": "2020-06-30 14:00", "val": 0.229}, {"time": "2020-06-30 15:00", "val": 0.301}, {"time": "2020-06-30 16:00", "val": 0.331}, {"time": "2020-06-30 17:00", "val": 0.321}, {"time": "2020-06-30 18:00", "val": 0.285}, {"time": "2020-06-30 19:00", "val": 0.221}, {"time": "2020-06-30 20:00", "val": 0.141}, {"time": "2020-06-30 21:00", "val": 0.095}, {"time": "2020-06-30 22:00", "val": 0.11}, {"time": "2020-06-30 23:00", "val": 0.177}, {"time": "2020-07-01 00:00", "val": 0.275}, {"time": "2020-07-01 01:00", "val": 0.391}, {"time": "2020-07-01 02:00", "val": 0.5}, {"time": "2020-07-01 03:00", "val": 0.556}, {"time": "2020-07-01 04:00", "val": 0.542}, {"time": "2020-07-01 05:00", "val": 0.474}, {"time": "2020-07-01 06:00", "val": 0.368}, {"time": "2020-07-01 07:00", "val": 0.231}, {"time": "2020-07-01 08:00", "val": 0.06}, {"time": "2020-07-01 09:00", "val": -0.109}, {"time": "2020-07-01 10:00", "val": -0.221}, {"time": "2020-07-01 11:00", "val": -0.249}, {"time": "2020-07-01 12:00", "val": -0.194}, {"time": "2020-07-01 13:00", "val": -0.082}, {"time": "2020-07-01 14:00", "val": 0.066}, {"time": "2020-07-01 15:00", "val": 0.216}, {"time": "2020-07-01 16:00", "val": 0.329}, {"time": "2020-07-01 17:00", "val": 0.39}, {"time": "2020-07-01 18:00", "val": 0.401}, {"time": "2020-07-01 19:00", "val": 0.381}, {"time": "2020-07-01 20:00", "val": 0.326}, {"time": "2020-07-01 21:00", "val": 0.249}, {"time": "2020-07-01 22:00", "val": 0.2}, {"time": "2020-07-01 23:00", "val": 0.206}, {"time": "2020-07-02 00:00", "val": 0.264}, {"time": "2020-07-02 01:00", "val": 0.358}, {"time": "2020-07-02 02:00", "val": 0.47}]}, "1516": {"getWarn": 1.05, "getAtte": 0.7, "obs_water_level": [{"time": "2020-06-29 14:00", "val": 0.178}, {"time": "2020-06-29 15:00", "val": 0.278}, {"time": "2020-06-29 16:00", "val": 0.341}, {"time": "2020-06-29 17:00", "val": 0.343}, {"time": "2020-06-29 18:00", "val": 0.283}, {"time": "2020-06-29 19:00", "val": 0.182}, {"time": "2020-06-29 20:00", "val": 0.05}, {"time": "2020-06-29 21:00", "val": -0.032}, {"time": "2020-06-29 22:00", "val": -0.064}, {"time": "2020-06-29 23:00", "val": -0.043}, {"time": "2020-06-30 00:00", "val": 0.033}, {"time": "2020-06-30 01:00", "val": 0.164}, {"time": "2020-06-30 02:00", "val": 0.25}], "harmonic": [{"time": "2020-06-29 20:00", "val": 0.073}, {"time": "2020-06-29 21:00", "val": -0.027}, {"time": "2020-06-29 22:00", "val": -0.071}, {"time": "2020-06-29 23:00", "val": -0.048}, {"time": "2020-06-30 00:00", "val": 0.03}, {"time": "2020-06-30 01:00", "val": 0.151}, {"time": "2020-06-30 02:00", "val": 0.286}, {"time": "2020-06-30 03:00", "val": 0.411}, {"time": "2020-06-30 04:00", "val": 0.507}, {"time": "2020-06-30 05:00", "val": 0.547}, {"time": "2020-06-30 06:00", "val": 0.516}, {"time": "2020-06-30 07:00", "val": 0.396}, {"time": "2020-06-30 08:00", "val": 0.215}, {"time": "2020-06-30 09:00", "val": 0.032}, {"time": "2020-06-30 10:00", "val": -0.113}, {"time": "2020-06-30 11:00", "val": -0.191}, {"time": "2020-06-30 12:00", "val": -0.193}, {"time": "2020-06-30 13:00", "val": -0.12}, {"time": "2020-06-30 14:00", "val": 0.005}, {"time": "2020-06-30 15:00", "val": 0.149}, {"time": "2020-06-30 16:00", "val": 0.289}, {"time": "2020-06-30 17:00", "val": 0.394}, {"time": "2020-06-30 18:00", "val": 0.443}, {"time": "2020-06-30 19:00", "val": 0.418}, {"time": "2020-06-30 20:00", "val": 0.322}, {"time": "2020-06-30 21:00", "val": 0.202}, {"time": "2020-06-30 22:00", "val": 0.101}, {"time": "2020-06-30 23:00", "val": 0.05}, {"time": "2020-07-01 00:00", "val": 0.056}, {"time": "2020-07-01 01:00", "val": 0.114}, {"time": "2020-07-01 02:00", "val": 0.213}, {"time": "2020-07-01 03:00", "val": 0.323}, {"time": "2020-07-01 04:00", "val": 0.42}, {"time": "2020-07-01 05:00", "val": 0.487}, {"time": "2020-07-01 06:00", "val": 0.503}, {"time": "2020-07-01 07:00", "val": 0.449}, {"time": "2020-07-01 08:00", "val": 0.305}, {"time": "2020-07-01 09:00", "val": 0.105}, {"time": "2020-07-01 10:00", "val": -0.089}, {"time": "2020-07-01 11:00", "val": -0.237}, {"time": "2020-07-01 12:00", "val": -0.308}, {"time": "2020-07-01 13:00", "val": -0.294}, {"time": "2020-07-01 14:00", "val": -0.195}, {"time": "2020-07-01 15:00", "val": -0.039}, {"time": "2020-07-01 16:00", "val": 0.136}, {"time": "2020-07-01 17:00", "val": 0.307}, {"time": "2020-07-01 18:00", "val": 0.44}, {"time": "2020-07-01 19:00", "val": 0.515}, {"time": "2020-07-01 20:00", "val": 0.51}, {"time": "2020-07-01 21:00", "val": 0.427}, {"time": "2020-07-01 22:00", "val": 0.314}, {"time": "2020-07-01 23:00", "val": 0.212}, {"time": "2020-07-02 00:00", "val": 0.154}, {"time": "2020-07-02 01:00", "val": 0.147}, {"time": "2020-07-02 02:00", "val": 0.189}]}, "1826": {"getWarn": 1.2, "getAtte": 0.8, "obs_water_level": [{"time": "2020-06-29 14:00", "val": 0.296}, {"time": "2020-06-29 15:00", "val": 0.251}, {"time": "2020-06-29 16:00", "val": 0.183}, {"time": "2020-06-29 17:00", "val": 0.138}, {"time": "2020-06-29 18:00", "val": 0.053}, {"time": "2020-06-29 19:00", "val": -0.001}, {"time": "2020-06-29 20:00", "val": -0.015}, {"time": "2020-06-29 21:00", "val": 0.016}, {"time": "2020-06-29 22:00", "val": 0.093}, {"time": "2020-06-29 23:00", "val": 0.213}, {"time": "2020-06-30 00:00", "val": 0.349}, {"time": "2020-06-30 01:00", "val": 0.429}, {"time": "2020-06-30 02:00", "val": 0.442}], "harmonic": [{"time": "2020-06-29 20:00", "val": -0.037}, {"time": "2020-06-29 21:00", "val": -0.005}, {"time": "2020-06-29 22:00", "val": 0.081}, {"time": "2020-06-29 23:00", "val": 0.202}, {"time": "2020-06-30 00:00", "val": 0.335}, {"time": "2020-06-30 01:00", "val": 0.445}, {"time": "2020-06-30 02:00", "val": 0.493}, {"time": "2020-06-30 03:00", "val": 0.476}, {"time": "2020-06-30 04:00", "val": 0.421}, {"time": "2020-06-30 05:00", "val": 0.342}, {"time": "2020-06-30 06:00", "val": 0.243}, {"time": "2020-06-30 07:00", "val": 0.127}, {"time": "2020-06-30 08:00", "val": 0.019}, {"time": "2020-06-30 09:00", "val": -0.052}, {"time": "2020-06-30 10:00", "val": -0.069}, {"time": "2020-06-30 11:00", "val": -0.028}, {"time": "2020-06-30 12:00", "val": 0.059}, {"time": "2020-06-30 13:00", "val": 0.167}, {"time": "2020-06-30 14:00", "val": 0.256}, {"time": "2020-06-30 15:00", "val": 0.292}, {"time": "2020-06-30 16:00", "val": 0.287}, {"time": "2020-06-30 17:00", "val": 0.261}, {"time": "2020-06-30 18:00", "val": 0.22}, {"time": "2020-06-30 19:00", "val": 0.163}, {"time": "2020-06-30 20:00", "val": 0.106}, {"time": "2020-06-30 21:00", "val": 0.083}, {"time": "2020-06-30 22:00", "val": 0.11}, {"time": "2020-06-30 23:00", "val": 0.185}, {"time": "2020-07-01 00:00", "val": 0.296}, {"time": "2020-07-01 01:00", "val": 0.42}, {"time": "2020-07-01 02:00", "val": 0.515}, {"time": "2020-07-01 03:00", "val": 0.54}, {"time": "2020-07-01 04:00", "val": 0.494}, {"time": "2020-07-01 05:00", "val": 0.406}, {"time": "2020-07-01 06:00", "val": 0.293}, {"time": "2020-07-01 07:00", "val": 0.164}, {"time": "2020-07-01 08:00", "val": 0.022}, {"time": "2020-07-01 09:00", "val": -0.109}, {"time": "2020-07-01 10:00", "val": -0.194}, {"time": "2020-07-01 11:00", "val": -0.211}, {"time": "2020-07-01 12:00", "val": -0.15}, {"time": "2020-07-01 13:00", "val": -0.029}, {"time": "2020-07-01 14:00", "val": 0.121}, {"time": "2020-07-01 15:00", "val": 0.248}, {"time": "2020-07-01 16:00", "val": 0.319}, {"time": "2020-07-01 17:00", "val": 0.341}, {"time": "2020-07-01 18:00", "val": 0.333}, {"time": "2020-07-01 19:00", "val": 0.305}, {"time": "2020-07-01 20:00", "val": 0.257}, {"time": "2020-07-01 21:00", "val": 0.205}, {"time": "2020-07-01 22:00", "val": 0.182}, {"time": "2020-07-01 23:00", "val": 0.205}, {"time": "2020-07-02 00:00", "val": 0.277}, {"time": "2020-07-02 01:00", "val": 0.387}, {"time": "2020-07-02 02:00", "val": 0.504}]}, "1236": {"getWarn": 1.25, "getAtte": 1.05, "obs_water_level": [{"time": "2020-06-29 14:00", "val": 0.467}, {"time": "2020-06-29 15:00", "val": 0.373}, {"time": "2020-06-29 16:00", "val": 0.209}, {"time": "2020-06-29 17:00", "val": 0.059}, {"time": "2020-06-29 18:00", "val": -0.129}, {"time": "2020-06-29 19:00", "val": -0.186}, {"time": "2020-06-29 20:00", "val": -0.189}, {"time": "2020-06-29 21:00", "val": -0.097}, {"time": "2020-06-29 22:00", "val": 0.077}, {"time": "2020-06-29 23:00", "val": 0.262}, {"time": "2020-06-30 00:00", "val": 0.464}, {"time": "2020-06-30 01:00", "val": 0.595}, {"time": "2020-06-30 02:00", "val": 0.619}], "harmonic": [{"time": "2020-06-29 20:00", "val": -0.164}, {"time": "2020-06-29 21:00", "val": -0.062}, {"time": "2020-06-29 22:00", "val": 0.12}, {"time": "2020-06-29 23:00", "val": 0.329}, {"time": "2020-06-30 00:00", "val": 0.517}, {"time": "2020-06-30 01:00", "val": 0.66}, {"time": "2020-06-30 02:00", "val": 0.718}, {"time": "2020-06-30 03:00", "val": 0.672}, {"time": "2020-06-30 04:00", "val": 0.533}, {"time": "2020-06-30 05:00", "val": 0.335}, {"time": "2020-06-30 06:00", "val": 0.128}, {"time": "2020-06-30 07:00", "val": -0.047}, {"time": "2020-06-30 08:00", "val": -0.15}, {"time": "2020-06-30 09:00", "val": -0.166}, {"time": "2020-06-30 10:00", "val": -0.097}, {"time": "2020-06-30 11:00", "val": 0.039}, {"time": "2020-06-30 12:00", "val": 0.203}, {"time": "2020-06-30 13:00", "val": 0.37}, {"time": "2020-06-30 14:00", "val": 0.492}, {"time": "2020-06-30 15:00", "val": 0.522}, {"time": "2020-06-30 16:00", "val": 0.462}, {"time": "2020-06-30 17:00", "val": 0.335}, {"time": "2020-06-30 18:00", "val": 0.181}, {"time": "2020-06-30 19:00", "val": 0.037}, {"time": "2020-06-30 20:00", "val": -0.054}, {"time": "2020-06-30 21:00", "val": -0.054}, {"time": "2020-06-30 22:00", "val": 0.041}, {"time": "2020-06-30 23:00", "val": 0.212}, {"time": "2020-07-01 00:00", "val": 0.408}, {"time": "2020-07-01 01:00", "val": 0.593}, {"time": "2020-07-01 02:00", "val": 0.731}, {"time": "2020-07-01 03:00", "val": 0.77}, {"time": "2020-07-01 04:00", "val": 0.694}, {"time": "2020-07-01 05:00", "val": 0.519}, {"time": "2020-07-01 06:00", "val": 0.282}, {"time": "2020-07-01 07:00", "val": 0.035}, {"time": "2020-07-01 08:00", "val": -0.175}, {"time": "2020-07-01 09:00", "val": -0.303}, {"time": "2020-07-01 10:00", "val": -0.332}, {"time": "2020-07-01 11:00", "val": -0.257}, {"time": "2020-07-01 12:00", "val": -0.094}, {"time": "2020-07-01 13:00", "val": 0.114}, {"time": "2020-07-01 14:00", "val": 0.331}, {"time": "2020-07-01 15:00", "val": 0.496}, {"time": "2020-07-01 16:00", "val": 0.566}, {"time": "2020-07-01 17:00", "val": 0.539}, {"time": "2020-07-01 18:00", "val": 0.43}, {"time": "2020-07-01 19:00", "val": 0.279}, {"time": "2020-07-01 20:00", "val": 0.132}, {"time": "2020-07-01 21:00", "val": 0.041}, {"time": "2020-07-01 22:00", "val": 0.038}, {"time": "2020-07-01 23:00", "val": 0.125}, {"time": "2020-07-02 00:00", "val": 0.288}, {"time": "2020-07-02 01:00", "val": 0.485}, {"time": "2020-07-02 02:00", "val": 0.67}]}, "1246": {"getWarn": 1.3, "getAtte": 1.15, "obs_water_level": [{"time": "2020-06-29 14:00", "val": 0.415}, {"time": "2020-06-29 15:00", "val": 0.246}, {"time": "2020-06-29 16:00", "val": 0.045}, {"time": "2020-06-29 17:00", "val": -0.129}, {"time": "2020-06-29 18:00", "val": -0.279}, {"time": "2020-06-29 19:00", "val": -0.286}, {"time": "2020-06-29 20:00", "val": -0.213}, {"time": "2020-06-29 21:00", "val": -0.042}, {"time": "2020-06-29 22:00", "val": 0.156}, {"time": "2020-06-29 23:00", "val": 0.356}, {"time": "2020-06-30 00:00", "val": 0.531}, {"time": "2020-06-30 01:00", "val": 0.608}, {"time": "2020-06-30 02:00", "val": 0.584}], "harmonic": [{"time": "2020-06-29 20:00", "val": -0.17}, {"time": "2020-06-29 21:00", "val": -0.018}, {"time": "2020-06-29 22:00", "val": 0.181}, {"time": "2020-06-29 23:00", "val": 0.386}, {"time": "2020-06-30 00:00", "val": 0.552}, {"time": "2020-06-30 01:00", "val": 0.643}, {"time": "2020-06-30 02:00", "val": 0.638}, {"time": "2020-06-30 03:00", "val": 0.537}, {"time": "2020-06-30 04:00", "val": 0.365}, {"time": "2020-06-30 05:00", "val": 0.163}, {"time": "2020-06-30 06:00", "val": -0.02}, {"time": "2020-06-30 07:00", "val": -0.146}, {"time": "2020-06-30 08:00", "val": -0.184}, {"time": "2020-06-30 09:00", "val": -0.128}, {"time": "2020-06-30 10:00", "val": -0.007}, {"time": "2020-06-30 11:00", "val": 0.145}, {"time": "2020-06-30 12:00", "val": 0.299}, {"time": "2020-06-30 13:00", "val": 0.424}, {"time": "2020-06-30 14:00", "val": 0.483}, {"time": "2020-06-30 15:00", "val": 0.45}, {"time": "2020-06-30 16:00", "val": 0.335}, {"time": "2020-06-30 17:00", "val": 0.179}, {"time": "2020-06-30 18:00", "val": 0.024}, {"time": "2020-06-30 19:00", "val": -0.097}, {"time": "2020-06-30 20:00", "val": -0.142}, {"time": "2020-06-30 21:00", "val": -0.081}, {"time": "2020-06-30 22:00", "val": 0.072}, {"time": "2020-06-30 23:00", "val": 0.272}, {"time": "2020-07-01 00:00", "val": 0.479}, {"time": "2020-07-01 01:00", "val": 0.649}, {"time": "2020-07-01 02:00", "val": 0.735}, {"time": "2020-07-01 03:00", "val": 0.715}, {"time": "2020-07-01 04:00", "val": 0.586}, {"time": "2020-07-01 05:00", "val": 0.372}, {"time": "2020-07-01 06:00", "val": 0.122}, {"time": "2020-07-01 07:00", "val": -0.108}, {"time": "2020-07-01 08:00", "val": -0.273}, {"time": "2020-07-01 09:00", "val": -0.338}, {"time": "2020-07-01 10:00", "val": -0.295}, {"time": "2020-07-01 11:00", "val": -0.168}, {"time": "2020-07-01 12:00", "val": 0.012}, {"time": "2020-07-01 13:00", "val": 0.21}, {"time": "2020-07-01 14:00", "val": 0.382}, {"time": "2020-07-01 15:00", "val": 0.481}, {"time": "2020-07-01 16:00", "val": 0.479}, {"time": "2020-07-01 17:00", "val": 0.39}, {"time": "2020-07-01 18:00", "val": 0.248}, {"time": "2020-07-01 19:00", "val": 0.093}, {"time": "2020-07-01 20:00", "val": -0.032}, {"time": "2020-07-01 21:00", "val": -0.074}, {"time": "2020-07-01 22:00", "val": -0.005}, {"time": "2020-07-01 23:00", "val": 0.153}, {"time": "2020-07-02 00:00", "val": 0.362}, {"time": "2020-07-02 01:00", "val": 0.581}, {"time": "2020-07-02 02:00", "val": 0.752}]}, "1256": {"getWarn": 1.17, "getAtte": 0.97, "obs_water_level": [{"time": "2020-06-29 14:00", "val": 0.307}, {"time": "2020-06-29 15:00", "val": 0.166}, {"time": "2020-06-29 16:00", "val": -0.03}, {"time": "2020-06-29 17:00", "val": -0.221}, {"time": "2020-06-29 18:00", "val": -0.388}, {"time": "2020-06-29 19:00", "val": -0.43}, {"time": "2020-06-29 20:00", "val": -0.385}, {"time": "2020-06-29 21:00", "val": -0.24}, {"time": "2020-06-29 22:00", "val": -0.041}, {"time": "2020-06-29 23:00", "val": 0.177}, {"time": "2020-06-30 00:00", "val": 0.37}, {"time": "2020-06-30 01:00", "val": 0.48}, {"time": "2020-06-30 02:00", "val": 0.465}], "harmonic": [{"time": "2020-06-29 20:00", "val": -0.239}, {"time": "2020-06-29 21:00", "val": -0.093}, {"time": "2020-06-29 22:00", "val": 0.117}, {"time": "2020-06-29 23:00", "val": 0.338}, {"time": "2020-06-30 00:00", "val": 0.515}, {"time": "2020-06-30 01:00", "val": 0.617}, {"time": "2020-06-30 02:00", "val": 0.623}, {"time": "2020-06-30 03:00", "val": 0.519}, {"time": "2020-06-30 04:00", "val": 0.322}, {"time": "2020-06-30 05:00", "val": 0.086}, {"time": "2020-06-30 06:00", "val": -0.135}, {"time": "2020-06-30 07:00", "val": -0.293}, {"time": "2020-06-30 08:00", "val": -0.347}, {"time": "2020-06-30 09:00", "val": -0.293}, {"time": "2020-06-30 10:00", "val": -0.155}, {"time": "2020-06-30 11:00", "val": 0.027}, {"time": "2020-06-30 12:00", "val": 0.21}, {"time": "2020-06-30 13:00", "val": 0.364}, {"time": "2020-06-30 14:00", "val": 0.453}, {"time": "2020-06-30 15:00", "val": 0.445}, {"time": "2020-06-30 16:00", "val": 0.34}, {"time": "2020-06-30 17:00", "val": 0.173}, {"time": "2020-06-30 18:00", "val": -0.009}, {"time": "2020-06-30 19:00", "val": -0.157}, {"time": "2020-06-30 20:00", "val": -0.217}, {"time": "2020-06-30 21:00", "val": -0.168}, {"time": "2020-06-30 22:00", "val": -0.025}, {"time": "2020-06-30 23:00", "val": 0.181}, {"time": "2020-07-01 00:00", "val": 0.4}, {"time": "2020-07-01 01:00", "val": 0.583}, {"time": "2020-07-01 02:00", "val": 0.691}, {"time": "2020-07-01 03:00", "val": 0.689}, {"time": "2020-07-01 04:00", "val": 0.562}, {"time": "2020-07-01 05:00", "val": 0.335}, {"time": "2020-07-01 06:00", "val": 0.064}, {"time": "2020-07-01 07:00", "val": -0.2}, {"time": "2020-07-01 08:00", "val": -0.396}, {"time": "2020-07-01 09:00", "val": -0.472}, {"time": "2020-07-01 10:00", "val": -0.427}, {"time": "2020-07-01 11:00", "val": -0.287}, {"time": "2020-07-01 12:00", "val": -0.09}, {"time": "2020-07-01 13:00", "val": 0.13}, {"time": "2020-07-01 14:00", "val": 0.333}, {"time": "2020-07-01 15:00", "val": 0.464}, {"time": "2020-07-01 16:00", "val": 0.487}, {"time": "2020-07-01 17:00", "val": 0.402}, {"time": "2020-07-01 18:00", "val": 0.245}, {"time": "2020-07-01 19:00", "val": 0.058}, {"time": "2020-07-01 20:00", "val": -0.101}, {"time": "2020-07-01 21:00", "val": -0.165}, {"time": "2020-07-01 22:00", "val": -0.115}, {"time": "2020-07-01 23:00", "val": 0.03}, {"time": "2020-07-02 00:00", "val": 0.24}, {"time": "2020-07-02 01:00", "val": 0.469}, {"time": "2020-07-02 02:00", "val": 0.663}]}}}
        );
    }
})

// menuFunction.js
app.use('/sent_water_level/', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Request-Method', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method == 'POST') {
        res.send({
            "status": "failed",
            "failed_message": "傳送 官網 XXXXXXXX不成功\n傳送 官網 XXXXXXXX不成功\n",
        });
    }
})

app.use('/sent_non_typhoon_pictures/', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Request-Method', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method == 'POST') {
        res.send({
            "status": "success",
            "message": "成功傳送",
            "failed_message": "傳送失敗",
        });
    }
})

app.use('/sent_all_data/', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Request-Method', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method == 'POST') {
        res.send({
            "status": "success"
        });
    }
})

app.listen(port,(err) => {
    if (err) {
        return console.log('bad');
    }
})
