import { input } from './input';

export const index = () => {
    const data = input.split('\n');

    let h = 0;
    let z = 0;
    let aim = 0;

    for (let i = 0; i < data.length; i++) {
        const record = data[i].split(' ');
        const direction = record[0];
        const distance = parseInt(record[1]);

        if (direction == 'forward') {
            h += distance;
            if (aim > 0) z += distance * aim;
        } else if (direction == 'down') {
            aim += distance;
        } else if (direction == 'up') {
            aim -= distance;
        }
    }

    const res = h * z;

    console.log('h', h);
    console.log('z', z);
    console.log('aim', aim);
    console.log('res', res);
};

index();
