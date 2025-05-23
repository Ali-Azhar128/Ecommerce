import jwt from 'jsonwebtoken'

const generateToken = (res, userId) => {
    const token = jwt.sign({userId}, process.env.REACT_APP_JWT_SECRET, 
        {
            expiresIn: '30d'
        }
    );

//Send JWT as HTTP cookie instead of storing it on the frontend for security
res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000 //30 days
})
}

export default generateToken