import integrationReducer from './integrationReducer'
import deepFreeze from 'deep-freeze'

const initialState = {
    allIntegrationTokens: null,
    integrationTokenName: "",
    integrationTokenValue: null,
    ttl: 86400,
  }

const allTokensTestData = [
    {
        "id": 14,
        "email": "123@gmail.com",
        "valid_until": "2025-07-28T21:09:01Z",
        "token": "123",
        "ttl": 72000000,
        "created_at": "2023-04-17T16:09:01+03:00",
        "token_name": "Helsingin Sanomat",
        "is_integration_token": true,
        "user": 29
    },
    {
        "id": 15,
        "email": "123@gmail.com",
        "valid_until": "2025-07-28T21:09:01Z",
        "token": "vUYBU2hx8o98OtTnFWv5FjWjviLFzPTqyTY1HdkOsAFPTVtVp96ahtJaekfm079R",
        "ttl": 72000000,
        "created_at": "2023-04-17T16:09:01+03:00",
        "token_name": "Helsingin Sanomat",
        "is_integration_token": true,
        "user": 29
    },
    {
        "id": 44,
        "email": "123@gmail.com",
        "valid_until": "2023-04-22T14:28:37.017581Z",
        "token": "ij2VLV98FrdPx8Eza4pgQLzhl3ZaWKdDAmgWltviR4PFuHvCnh4vlt0YFo5yucpD",
        "ttl": 86400,
        "created_at": "2023-04-21T17:28:37.017581+03:00",
        "token_name": "HY",
        "is_integration_token": true,
        "user": 29
    },
    {
        "id": 46,
        "email": "123@gmail.com",
        "valid_until": "2023-04-22T14:37:41.686057Z",
        "token": "HBD5LxmxvueUSufjEesc4U6kdKdFocBJFObwreYm2b6p8Igi6LRleTC1Zmyor1P7",
        "ttl": 86400,
        "created_at": "2023-04-21T17:37:41.686057+03:00",
        "token_name": "HY",
        "is_integration_token": true,
        "user": 29
    },
    {
        "id": 47,
        "email": "123@gmail.com",
        "valid_until": "2023-04-25T09:40:10.082206Z",
        "token": "VonfFaWqbLEL0oqNID1JPZXXpWsFsFCCM7jd7ZXFvWdc8CYjxI5qlVq6OPK15ePk",
        "ttl": 86400,
        "created_at": "2023-04-24T12:40:10.082206+03:00",
        "token_name": "HYY",
        "is_integration_token": true,
        "user": 29
    },
    {
        "id": 48,
        "email": "123@gmail.com",
        "valid_until": "2023-04-25T09:46:31.809926Z",
        "token": "4dhAFZG28EcQKMA7SkfiFHUyjVNVMf9dS71Ko2xtrHhR1dYzvu10bRRusjY8tMhd",
        "ttl": 86400,
        "created_at": "2023-04-24T12:46:31.809926+03:00",
        "token_name": "HYY",
        "is_integration_token": true,
        "user": 29
    },
    {
        "id": 49,
        "email": "123@gmail.com",
        "valid_until": "2023-04-25T09:51:50.274451Z",
        "token": "uqyQmOswlHKxngXSwH9s72E1sbIZlELFgg0vKv7oDWm7VIUitu3DCac7QC3mT2yo",
        "ttl": 86400,
        "created_at": "2023-04-24T12:51:50.274451+03:00",
        "token_name": "1",
        "is_integration_token": true,
        "user": 29
    },
    {
        "id": 50,
        "email": "123@gmail.com",
        "valid_until": "2023-04-25T09:53:04.992836Z",
        "token": "G3yd8xkXnyrIJ76zOMlFb9IWyjUNx6e0QZaI8sKtxjewZkHCG9NhPo75ZGPzvsBK",
        "ttl": 86400,
        "created_at": "2023-04-24T12:53:04.992836+03:00",
        "token_name": "12",
        "is_integration_token": true,
        "user": 29
    },
    {
        "id": 51,
        "email": "123@gmail.com",
        "valid_until": "2023-04-25T09:53:11.837316Z",
        "token": "xSCaR21WJQ1jNzdlHF5274i4lritNcQBf42X65vx6jgPSfUOCh94TcNA4TyivQy2",
        "ttl": 86400,
        "created_at": "2023-04-24T12:53:11.837316+03:00",
        "token_name": "123",
        "is_integration_token": true,
        "user": 29
    },
    {
        "id": 52,
        "email": "123@gmail.com",
        "valid_until": "2025-07-28T21:09:01Z",
        "token": "kyz8IrapdTsmoX6IM30xXP9PNMjOC8OFQEd0lrv6BqqRX14JhlxQIm8CgP8bRk1K",
        "ttl": 72000000,
        "created_at": "2023-04-17T16:09:01+03:00",
        "token_name": "6666666",
        "is_integration_token": true,
        "user": 29
    }
]



describe('integrationReducer', ()=>{
    test('returns new state with action integration/updateintegrationTokenName', () => { 
        const state = initialState
        const action = {
            type: "integration/updateintegrationTokenName",
            payload: "test"
        }
    
        deepFreeze(state)
        const newState = integrationReducer(state,action)
    
        expect(newState.integrationTokenName).toHaveLength(4)
        expect(newState.integrationTokenName).toEqual(action.payload)    
    })
    test('returns new state with action integration/updateintegrationTokenValue', () => { 
        const state = initialState
        const action = {
            type: "integration/updateintegrationTokenValue",
            payload: "vUYBU2hx8o98OtTnFWv5FjWjviLFzPTqyTY1HdkOsAFPTVtVp96ahtJaekfm079R"
        }
    
        deepFreeze(state)
        const newState = integrationReducer(state,action)
    
        expect(newState.integrationTokenValue).toHaveLength(64)
        expect(newState.integrationTokenValue).toEqual(action.payload)    
    })

    test('returns new state with action integration/updateintegrationTokenTtl', () => { 
        const state = initialState
        const action = {
            type: "integration/updateintegrationTokenTtl",
            payload: 604800
        }
    
        deepFreeze(state)
        const newState = integrationReducer(state,action)
    
        expect(newState.ttl).toEqual(action.payload)    
    })

    test('returns new state with action integration/setAllIntegrationTokens', () => { 
        const state = initialState
        const action = {
            type: "integration/setAllIntegrationTokens",
            payload: allTokensTestData
        }
    
        deepFreeze(state)
        const newState = integrationReducer(state,action)
    
        expect(newState.allIntegrationTokens).toEqual(action.payload)    
    })
})
