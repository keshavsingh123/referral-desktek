import { Referral } from "../schema/referal.schema.js";
import { User } from "../schema/user.schema.js";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export const createUSer = async (req, res) => {
  const { name, mobile, referralCode, gender, technology, dateOfBirth } =
    req.body;
  const profilePics = req.files.map((file) => file.path);
  try {
    let points = 0;
    let user = await User.findOne({ mobile });
    if (user)
      return res.status(400).send({ message: "Mobile number already exists" });
    let referral = null;
    if (referralCode) {
      referral = await Referral.findOne({ code: referralCode });
      if (!referral) return res.status(400).json({ message: 'Invalid referral code' });
    }
    
    user = new User({
      name,
      mobile,
      referralCode,
      gender,
      technology,
      profilePic: profilePics,
      dateOfBirth,
    });
    if (referral) {
        referral.referredUsers.push(user._id);
      referral.points += 20; 
      await referral.save();
      user.points = 10;
      }
    await user.save();
    const token = jwt.sign({ user: user._id }, process.env.TOKEN, {
      expiresIn: "10h",
    });
    res.status(201).send({ message: "User created successfully", user, token });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
export const getReferralList = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
      const referral = await Referral.find()
      .populate('referredUsers')
      .limit(limit * 1)
      .skip((page - 1) * limit);
  
      if (!referral) return res.status(404).send({ message: 'No referral data found' });
  
      res.send({referral });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };
  export const deleteReferral = async (req, res) => {
    try {
    const userId = req.params.id
    await User.findByIdAndDelete(userId);
    res.status(200).send({ message: 'Referral user deleted' });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };
export const updateUser = async (req, res) => {
  const { name, gender, technology, dateOfBirth } = req.body;
    const userId = req.params.id
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { name, gender, technology, dateOfBirth },
      { new: true }
    );
    if (!user) return res.status(404).send({ message: "User not found" });

    res.send({ message: "Profile updated successfully", user });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
