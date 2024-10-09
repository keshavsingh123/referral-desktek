import { Referral } from "../schema/referal.schema.js";
import {ObjectId} from "mongodb";

export const createReferralCode = async (req, res) => {
    const { code } = req.body;
  
    try {
      const referral = new Referral({ code });
      await referral.save();
      res.status(201).send({ message: 'Referral code created', referral });
    } catch (error) {
      res.status(500).send({ message: 'Error creating referral code', error });
    }
  };





// export const getReferralList = async (req, res) => {
//     const { page = 1, limit = 10 } = req.query;
//     const userId = req.params.id
//     console.log(userId);
//     try {
//       const referral = await Referral.findOne({userId: new ObjectId(userId)}).populate({
//         path: 'referredUsers',
//         select: 'name mobile',
//         options: { skip: (page - 1) * limit, limit: parseInt(limit) }
//       });
  
//       if (!referral) return res.status(404).send({ message: 'No referral data found' });
  
//       res.send({ referredUsers: referral.referredUsers });
//     } catch (err) {
//       res.status(500).send({ message: err.message });
//     }
//   };

//   export const deleteReferral = async (req, res) => {
//     try {
//     const userId = req.params.id
//       const referral = await Referral.findOne({userId: new ObjectId(userId)});
//       if (!referral) return res.status(404).json({ message: 'No referral data found' });
  
//       referral.referredUsers = referral.referredUsers.filter(
//         userId => userId.toString() !== req.params.id
//       );
  
//       await referral.save();
//       res.send({ message: 'Referral user deleted' });
//     } catch (err) {
//       res.status(500).send({ message: err.message });
//     }
//   };