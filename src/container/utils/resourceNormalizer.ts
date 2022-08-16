export default (name: string) => {
  const splat = name.split('.');
  const namespace = splat.pop();
  const resource = splat.map((s) => s.split('-')).flat();
  let resourceName = resource.shift();

  resourceName += resource.reduce((total, part) => total + part.replace(/^./, part[0].toUpperCase()), '');

  if (namespace != null) {
    resourceName += namespace.replace(/\w/, (a) => a.toUpperCase());
    return resourceName;
  }

  return null;
};
