export function mapArrayIntoMap(values: { id: string }[]) {
  return values.reduce(
    (acc, item) => ({
      ...acc,
      [item.id]: item,
    }),
    {}
  );
}
