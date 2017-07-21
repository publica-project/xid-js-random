function randByte(): number {
  return ~~(Math.random() * 256);
}

export namespace seed {
  const mID = randByte() << 16 | randByte() << 8 | randByte();
  const pID = randByte() << 8 | randByte();
  let counter = randByte() << 16 | randByte() << 8 | randByte();

  // getTime specifies the current epoch time in seconds.
  export function getTime(): number {
    return ~~((new Date).getTime() / 1000);
  }

  // getMachineID specifies the ID of the machine that will generate the XID.
  export function getMachineID(): number {
    return mID;
  }

  // getMachineID specifies the ID of the machine that will generate the XID.
  export function getCounter(): number {
    counter += 1;
    return counter;
  }

  // getPID specifies the ID of the process that will generate the XID.
  export function getPID(): number {
    return pID;
  }
}
