import { input } from './input';

export const index = () => {
    const draw = input
        .split('\n')[0]
        .split(',')
        .map(i => parseInt(i));
    const allBoards = input.split('\n\n').splice(1);

    const playerBoards = allBoards.map((b, i) => {
        const hLines = b.split('\n').map(hLine =>
            hLine
                .split(' ')
                .filter(h => h)
                .map(h => parseInt(h)),
        );
        let vLines = [];
        for (let i = 0; i < hLines.length; i++) {
            let numbers = [];
            for (let j = 0; j < hLines.length; j++) {
                numbers.push(hLines[j][i]);
            }
            vLines.push(numbers);
        }
        return hLines.concat(vLines);
    });

    CalculatePart1(draw, playerBoards);
    CalculatePart2(draw, playerBoards);
};

const CalculatePart1 = (draw: number[], playerBoards: number[][][]) => {
    let finished = false;
    let winningNumber: number = 0;
    let unmarkedBoard: number[][] = [];

    draw.map(d => {
        if (finished) return;
        playerBoards.forEach((boards, playerIndex) => {
            if (finished) return;
            boards.forEach((b, boardIndex) => {
                if (finished) return;
                playerBoards[playerIndex][boardIndex] = b.filter(n => n != d);
                if (playerBoards[playerIndex][boardIndex].length == 0) {
                    winningNumber = d;
                    unmarkedBoard = playerBoards[playerIndex];
                    finished = true;
                }
            });
        });
    });

    Result(unmarkedBoard, winningNumber, 1);
};

const CalculatePart2 = (draw: number[], playerBoards: number[][][]) => {
    let finished = false;
    let winningNumber: number = 0;
    let unmarkedBoard: number[][] = [];
    let removedPlayers: number[] = [];

    draw.map(d => {
        if (finished) return;
        playerBoards.forEach((boards, playerIndex) => {
            if (finished || removedPlayers.includes(playerIndex)) return;
            boards.forEach((b, boardIndex) => {
                if (finished || removedPlayers.includes(playerIndex)) return;
                playerBoards[playerIndex][boardIndex] = b.filter(n => n != d);
                if (playerBoards[playerIndex][boardIndex].length == 0) {
                    removedPlayers.push(playerIndex);
                    if (removedPlayers.length == playerBoards.length) {
                        winningNumber = d;
                        unmarkedBoard = playerBoards[playerIndex];
                        finished = true;
                    }
                }
            });
        });
    });

    Result(unmarkedBoard, winningNumber, 2);
};

const Result = (unmarkedBoard: number[][], winningNumber: number, part: number) => {
    const winningLineIndex = unmarkedBoard.findIndex(l => l == []);
    const remainingNumbers = unmarkedBoard.slice(winningLineIndex < 4 ? 0 : 4, 5);
    let count = 0;
    remainingNumbers.forEach(r => r.forEach(n => (count += n)));
    const resultPart = count * winningNumber;
    console.log(`Part ${part} Result`, resultPart);
};

index();
