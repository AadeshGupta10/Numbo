import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

interface PlaygroundProps {
    grid_size: number,
}

const Playground = ({ grid_size }: PlaygroundProps) => {

    var totalBlocks = grid_size * grid_size;

    const [arr, setArr] = useState<number[]>([]);
    const [won, setWon] = useState(false);

    const continuityArray = new Array(totalBlocks).fill(0).map((_, index) => index + 1);

    const [click, setClick] = useState(0);

    const ref = useRef<any>([]);

    useEffect(() => {
        if (JSON.stringify(continuityArray) === JSON.stringify(arr)) {

            if (click == 0) {
                initializeGame();
            }
            else {
                setWon(true);
            }
        }
    }, [arr])

    const initializeGame = () => {

        setClick(0);
        setWon(false);

        let initial = 0;
        const numbers: number[] = [];

        const randomGenerator = () => {
            return Math.floor(Math.random() * totalBlocks) + 1;
        }

        const duplicateChecker = (value: number) => {
            return numbers.filter(item => item == value).length;
        }

        while (initial < totalBlocks) {
            var random = randomGenerator();

            if (duplicateChecker(random) < 1) {
                numbers.push(random);
                initial++;
            }
        }
        setArr(numbers);
    }

    useEffect(() => {
        initializeGame();
    }, [grid_size])

    const handleClick = (id_index: number) => {

        const empty_box = arr.indexOf(totalBlocks)

        if (won || id_index == arr.indexOf(totalBlocks)) return;

        if (
            (id_index == empty_box + 1 && (empty_box + 1) % grid_size != 0)
            || (id_index == empty_box - 1 && empty_box % grid_size != 0)
            || id_index == empty_box + grid_size
            || id_index == empty_box - grid_size
        ) {
            const temp_arr = [...arr];
            temp_arr[empty_box] = temp_arr[id_index];
            temp_arr[id_index] = totalBlocks;

            setArr(temp_arr);
            setClick(prev => prev + 1)
        }
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen container mx-auto p-4">
            <div className={`grid gap-3`}
                style={{
                    gridTemplateColumns: `repeat(${grid_size},minmax(0,1fr))`,
                    width: `min(100%,${grid_size * 6}rem)`
                }}>
                {
                    arr.map((num, index) =>
                        <div
                            className={`flex justify-center items-center tracking-widest aspect-square rounded-lg font-semibold cursor-pointer select-none text-lg dark:text-gray-800
                                ${won ?
                                    "bg-green-600 text-white dark:text-white"
                                    : num != totalBlocks ?
                                        "bg-muted-foreground"
                                        : "bg-card-foreground"
                                }`}
                            onClick={() => handleClick(index)}
                            key={num}>
                            {
                                won ?
                                    num :
                                    num != totalBlocks && num
                            }
                        </div>
                    )
                }
            </div>

            <div className="mt-12 flex flex-col justify-center items-center gap-5">
                {
                    won &&
                    <div className="text-2xl font-bold tracking-tight text-green-600 animate-bounce text-center">
                        Hurray You Have Won the Game
                    </div>
                }
                <Button
                    ref={(e) => ref.current[0] = e}
                    size={"lg"}
                    className="bg-red-600 hover:bg-red-700 transition-colors duration-300"
                    onClick={initializeGame}>
                    {
                        won ? "Play Again" : "Reset Game"
                    }
                </Button>
            </div>
        </div>
    )
}

export default Playground