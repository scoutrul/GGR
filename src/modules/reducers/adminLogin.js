const initialstate = {
  adminUser: false,
};

export default function adminLogin(state = initialstate, action = {}) {
  switch (action.type) {
    case 'LOGGING_IN' : {
      console.log('LOGGING IN!');
      const newState = {
        ...state,
        adminUser: true,
      };
    }
    default:
      return state;
  }
}
