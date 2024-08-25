function callRefMethod<T extends { [key: string]: (...arg: any[]) => any }>(
  ref: any,
  method: keyof T,
  ...args: Parameters<T[keyof T]>
): ReturnType<T[keyof T]> | null {
  try {
    return ref.current?.[method]?.(...args) ?? null;
  } catch {
    return null;
  }
}

export { callRefMethod };
