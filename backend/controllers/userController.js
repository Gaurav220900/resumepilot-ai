import express from 'express';
import User from '../models/user.js';

exports.profileDetails = async (req, res) => {
    try{
        const id = req.user._id;

        if(!id){
            return res.status(400).json({ message: "User ID not found" });
        }
        const updatedUser = await User.FindByIdAndUpdate(
            { _id: id },
            { $set: req.body },
            { new: true }
        );

        if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
        message: "Profile updated successfully",
        user: updatedUser
        });

  } catch (error) {
    console.error("Update Error:", error);
    return res.status(500).json({ message: "Server error while updating profile" });
  }

}