export const config = {
    github: {
      owner: 'jkinos',
      repository: 'warehouse-app-backend',
    },
    env: { 
        account: process.env.CDK_DEFAULT_ACCOUNT, 
        region: process.env.CDK_DEFAULT_REGION 
    }
  }