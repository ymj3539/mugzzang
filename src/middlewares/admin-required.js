import jwt from 'jsonwebtoken';

const adminRequired = (req, res, next) => {
    const userToken = req.headers['authorization']?.split(' ')[1];

    try {
        const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
        const jwtDecoded = jwt.verify(userToken, secretKey);
        const userRole = jwtDecoded.role;
        console.log(userRole);

        if(userRole !== "admin"){
            res.status(403).json({
                result : "forbidden-approach",
                reason : '접근 권한이 없는 페이지입니다.'
            });
            return;
        }

        next();



    } catch (error){
        next(error);
    }
    
 }

export {adminRequired};