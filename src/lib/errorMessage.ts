export const errorMessage = (message: string) => {
  throw new Error(process.env.NODE_ENV === 'production' ? '' : message);
};
