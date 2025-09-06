import authRoutes from './authRoutes.js';
import adminRoutes from './adminRoutes.js';
import visitRoutes from './visitRoutes.js';
import membershipRoutes from './membershipRoutes.js';
import userRoutes from './userRoutes.js';

const routeStartup = (app) => {
    // app.use('/', (req, res) => {
    //     res.send("server running")
    // });
    app.use('/api/auth', authRoutes);
    app.use('/api/admin', adminRoutes);
    app.use('/api/memberships', membershipRoutes);
    
    // user
    app.use('/api/user', userRoutes);
    
    // visits
    app.use('/api/visits', visitRoutes);
    

};

export default routeStartup;
