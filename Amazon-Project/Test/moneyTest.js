import { formatCurrency } from '../Scripts/utils/money.js';

// Their Are 2 Types of test cases we have
// 1. Basic Test Cases
// 2. Edge cases

if (formatCurrency(2095) == '20.95') {
    console.log('passed');
} else {
    console.log('failed');
}


if (formatCurrency(0) === '0.00') {
    console.log('passed');
} else {
    console.log('failed');
}


if (formatCurrency(2000.5) === '20.01') {
    console.log('passed');
} else {
    console.log('failed');
}