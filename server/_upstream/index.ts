
const isprod = ()=>process.env.NODE_ENV==='production'
const BASE = isprod()?"http://pa.debug.cnworkshop.xyz:20080":"http://pa.debug.cnworkshop.xyz:20080"

export default{
    authJWTGet:`${BASE}/api/v1/auth/acquire`,
    authJWTVerify:`${BASE}/api/v1/auth/verify`,
    authJWTRefresh:`${BASE}/api/v1/auth/refresh`,
}