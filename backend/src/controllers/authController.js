const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { loginSchema, registerSchema } = require('../validators/authValidator');


const register = async (req, res, next) => {
    try {
        const validatedData = registerSchema.parse(req.body);

        const existingUser = await User.findOne({ email: validatedData.email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "User already exists" });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(validatedData.password, salt);

        const user = await User.create({
            ...validatedData,
            password: hashedPassowrd
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully"
        });

    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    try {
        const validatedData = loginSchema.parse(req.body);
        const user = await User.findOne({ email: validatedData.email });

        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = bcrypt.compareSync(user.password, validatedData.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        const refreshToken = jwt.sign({ id: user._id },process.env.REFRESH_SECRET,{ expiresIn: '7d' });

        res.status(200).json({
            success: true,
            accessToken,
            refreshToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                currency: user.currency
            }
        });

    } catch (error) {
        next(error);
    }

}

module.exports = { register, login };