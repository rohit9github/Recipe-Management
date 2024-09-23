const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const tokenHeader = req.headers['authorization'];
    if (!tokenHeader) return res.status(401).json({ message: 'Access denied' });
    
    const token = tokenHeader.split(' ')[1]; // Extract token without the "Bearer " prefix
    if (!token) return res.status(401).json({ message: 'Access denied' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = decoded; // Add decoded user info to request
        next();
    });
};
