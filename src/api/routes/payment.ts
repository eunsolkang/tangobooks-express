import express from "express";
import User from "../../models/User";
import axios from 'axios'
import config from '../../config/vars'
const router = express.Router();

router.post('/complete', async(req, res, next)=>{
    try{
        const { imp_uid, merchant_uid, user_id } = req.body; 

        //액세스 토큰(access token) 발급 받기
        const getToken = await axios({
          url: "https://api.iamport.kr/users/getToken",
          method: "post", // POST method
          headers: { "Content-Type": "application/json" }, // "Content-Type": "application/json"
          data: {
            imp_key: config.import.api, // REST API키
            imp_secret: config.import.secret // REST API Secret
          }
        });
        const { access_token } = getToken.data.response; // 인증 토큰
        // imp_uid로 아임포트 서버에서 결제 정보 조회
        const getPaymentData = await axios({
          url: `https://api.iamport.kr/payments/${imp_uid}`, // imp_uid 전달
          method: "get", // GET method
          headers: { "Authorization": access_token } // 인증 토큰 Authorization header에 추가
        });
        const paymentData = getPaymentData.data.response; // 조회한 결제 정보

        const { amount, status } = paymentData;
        if (status === 'paid'){
            const user = await User.findOneAndUpdate(
                { _id:  user_id},
                { $inc : {coin : amount}},
                {new : true}
            ).populate('library');
            res.send({status:200, data:user});
        }
        else{
            console.log('결제애러');
            res.send({status:501});
        }
        
        
    }catch( error ){ 
        next(error);
    }
});


export default router;
