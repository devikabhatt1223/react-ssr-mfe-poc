type ScheduledFunction = () => void | Promise<void>;

/** Async Programming & Event Loop
 * Implemented a function schedule(fn, delay):
 */
export const createScheduler = (N: number) => {
  const timestamps: number[] = []; // closure to keep track of execution times

  const schedule = (fn: ScheduledFunction, delay: number): Promise<void> =>
    new Promise((resolve, reject) => {
      setTimeout(async () => {
        const now = Date.now();

        // Remove timestamps older than 1 second
        while (timestamps.length && now - timestamps[0] >= 1000) {
          timestamps.shift();
        }

        const exec = async () => {
          try {
            timestamps.push(Date.now());
            await fn();
            resolve();
          } catch (error) {
            reject(error);
          }
        };

        if (timestamps.length >= N) {
          const waitTime = 1000 - (now - timestamps[0]);
          setTimeout(async () => {
            timestamps.shift();
            await exec();
          }, waitTime);
        } else {
          await exec();
        }
      }, delay);
    });

  return schedule;
};

const scheduler = createScheduler(3);
scheduler(() => console.log("schedule fn output =====>>>>>"), 10000);
scheduler(() => console.log("schedule fn output =====>>>>>"), 10000);
scheduler(() => console.log("schedule fn output =====>>>>>"), 10000);
scheduler(() => console.log("schedule fn output =====>>>>>"), 10000);

type AnyFn = (arg: any) => any | Promise<any>;

/** Function Composition & Closures */
export const compose = (fns: AnyFn[]) => {
  return async (input: any): Promise<any> => {
    let result = input;
    for (const fn of fns) {
      result = await fn(result);
    }
    return result;
  };
};

const double = (x: number) => x * 2;

const asyncAddTen = async (x: number) => {
  return new Promise<number>((resolve) => {
    setTimeout(() => resolve(x + 10), 100);
  });
};

const composedFn = compose([double, asyncAddTen, double]);

composedFn(5).then((result) => {
  console.log("compose function output =====>>>>>", result);
});
