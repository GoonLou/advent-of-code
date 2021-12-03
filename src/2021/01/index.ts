import { input } from './input';

export const index = () => {
    const data = input.split('\n');
    console.log('length', data.length);

    count('Part 1', data);

    const inputSum = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i + 2]) {
            inputSum.push(parseInt(data[i]) + parseInt(data[i + 1]) + parseInt(data[i + 2]));
        }
    }
    count('Part 2', inputSum);
};

const count = (part: string, data: string[] | number[]) => {
    let count = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i] < data[i + 1]) ++count;
    }
    console.log(part, count);
};

index();
