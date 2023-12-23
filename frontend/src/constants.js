const constants = {
    difficultyMapping: [
        {
            color: 'bg-green-600',
            text: 'Easy'
        },
        {
            color: 'bg-yellow-600',
            text: 'Medium'
        },
        {
            color: 'bg-red-600',
            text: 'Hard'
        },
        {
            color: 'bg-blue-600',
            text: 'Other'
        }
    ],

    difficultyMappingDecks: [
        {
            color: 'bg-green-600',
            text: 'Basic'
        },
        {
            color: 'bg-yellow-600',
            text: 'Intermediate'
        },
        {
            color: 'bg-red-600',
            text: 'Advanced'
        },
        {
            color: 'bg-blue-600',
            text: 'Other'
        }
    ],

    endpoints: {
        domain: 'http://localhost:8000',
        prefixes: {
            auth: 'auth',
            cards: 'cards'
        }
    },

    generalConstants: {
        learnedEasinessThreshold: 2,
    }
}

export default constants;