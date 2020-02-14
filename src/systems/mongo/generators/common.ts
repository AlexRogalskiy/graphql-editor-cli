import inquirer from 'inquirer';
import { HandleTemplates } from '../../../handleTemplates';
import * as templates from '../templates';
import { functionParams } from './models';
import { getPaths } from './paths';
import { addStucco } from './stucco';

export const common = async ({ resolverParentName, resolverField, rootTypes }: functionParams) => {
  const { resolverPath, basePath, resolverLibPath } = getPaths(resolverParentName, resolverField);
  const { resolverType }: { resolverType: string } = await inquirer.prompt([
    {
      type: 'list',
      name: 'resolverType',
      message: `Specify resolver type`,
      choices: ['resolver', 'pipe'],
    },
  ]);
  if (resolverType === 'resolver') {
    HandleTemplates.action({
      content: templates.resolver({
        field: resolverField,
        resolverParent: resolverParentName,
      }),
      path: resolverPath,
      type: 'add',
    });
  }
  if (resolverType === 'pipe') {
    HandleTemplates.action({
      content: templates.pipe(),
      path: resolverPath,
      type: 'add',
    });
  }
  addStucco({ basePath, stuccoResolverName: `${resolverParentName}.${resolverField.name}`, resolverLibPath });
};
