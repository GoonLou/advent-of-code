import { input } from './input';

export const index = () => {
    const data = input.split('\n');
    const bitsLength = data[0].split('').length;

    let gString = '';
    let eString = '';
    for (let i = 0; i < bitsLength; i++) {
        let count = 0;
        data.map(d => (d.charAt(i) == '1' ? count++ : count--));
        gString += count >= 0 ? '1' : '0';
        eString += count >= 0 ? '0' : '1';
    }
    const gDec = parseInt(gString, 2);
    const eDec = parseInt(eString, 2);
    const resPart1 = gDec * eDec;
    console.log('Gamma', gDec);
    console.log('Epsilon', eDec);
    console.log('Part1', resPart1);

    const ORating = GetRating(data, bitsLength, false);
    console.log('final O', ORating);
    const CO2Rating = GetRating(data, bitsLength, true);
    console.log('final CO2', CO2Rating);
    const resPart2 = ORating * CO2Rating;
    console.log('Part1', resPart2);
};

const GetRating = (data: string[], bitsLength: number, leastCommon: boolean): number => {
    let tempData = data;
    for (let i = 0; i < bitsLength; i++) {
        let countZero = 0;
        let countOne = 0;
        tempData.map(d => (d.charAt(i) == '1' ? countOne++ : countZero++));
        tempData =
            countOne >= countZero
                ? GenerateBinary(tempData, i, leastCommon ? '0' : '1')
                : GenerateBinary(tempData, i, leastCommon ? '1' : '0');
        if (tempData.length == 1) break;
    }
    return parseInt(tempData[0], 2);
};

const GenerateBinary = (tempData: string[], index: number, bit: string): string[] => {
    let arrToRemove: string[] = [];
    tempData.forEach(d => {
        if (d.charAt(index) != bit) arrToRemove.push(d);
    });
    return tempData.filter(d => !arrToRemove.includes(d));
};

index();
