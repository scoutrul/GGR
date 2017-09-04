import Backendless from 'backendless'

const APP_ID = '402AB182-EB78-44E3-FF2F-08B037392D00'
const API_KEY = '2AF3DE22-A4C2-1CAA-FF44-0A4B1FD3FE00'
Backendless.initApp(APP_ID, API_KEY)

export const DB = Backendless;