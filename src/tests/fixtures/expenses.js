import moment from 'moment';

export default [{
    id: '1',
    description: 'gum',
    note: '',
    amount: 196,
    createdAt: 0
},
{
    id: '2',
    description: 'rent',
    note: '',
    amount: 197000,
    createdAt: moment(0).subtract(4, 'days').valueOf()
},
{
    id: '3',
    description: 'credit card',
    note: '',
    amount: 4000,
    createdAt: moment(0).add(4, 'days').valueOf()
}]