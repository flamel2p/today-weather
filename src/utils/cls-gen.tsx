const PREFIX = '';
const EXIST_CLASSNAME: string | string[] = [];

const ClsGen = (scope: any, prefix = PREFIX) => {
  return (name?: any) => {
    const classname = [prefix, scope, name].filter((item) => !!item).join('-');
    if (EXIST_CLASSNAME.indexOf(classname) > -1) {
      console.warn(`${classname} already existed, please use another classname.`);
    }
    return classname;
  };
};

export default ClsGen;