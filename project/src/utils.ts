const generateID = (): string => Math.random().toString(36).substr(2, 11);

export {generateID};
