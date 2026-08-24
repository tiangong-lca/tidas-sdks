# TIDAS TypeScript SDK

[English](README.md) | 中文

面向 TIDAS（天工生命周期评价数据格式）的 TypeScript SDK，提供类型契约、
运行时验证、XML 转换和包级 parity 工具。

发布包：[@tiangong-lca/tidas-sdk](https://www.npmjs.com/package/@tiangong-lca/tidas-sdk)。
当前版本以已安装包或 npm registry 为准，文档不重复维护版本号。

运行环境要求 Node.js 24 或更高版本。

## 安装

```bash
npm install @tiangong-lca/tidas-sdk
```

## 公开入口

| 入口 | 用途 |
| --- | --- |
| `@tiangong-lca/tidas-sdk` | 汇总公开 API |
| `@tiangong-lca/tidas-sdk/core` | 实体类和当前工厂函数 |
| `@tiangong-lca/tidas-sdk/types` | 生成的 TIDAS TypeScript 类型 |
| `@tiangong-lca/tidas-sdk/schemas` | 生成的 Zod schema 与验证助手 |
| `@tiangong-lca/tidas-sdk/contracts` | TIDAS 上下文和方法学契约 |
| `@tiangong-lca/tidas-sdk/parity` | 数据包目录的 JSON Schema 验证 |
| `@tiangong-lca/tidas-sdk/xml` | XML 解析和序列化 |
| `@tiangong-lca/tidas-sdk/tools` | 目录转换和运行时资产 |
| `@tiangong-lca/tidas-sdk/utils` | 通用 SDK 工具 |

发布前会用 CJS、ESM 和 TypeScript declaration consumer 对全部入口做真实加载。

## 当前工厂 API

```typescript
import {
  createContact,
  createFlow,
  createFlowProperty,
  createLCIAMethod,
  createLifeCycleModel,
  createProcess,
  createSource,
  createUnitGroup,
} from '@tiangong-lca/tidas-sdk/core';
```

每种实体还提供 `FromJSON` 和复数 `Batch` 变体。多语言字段使用标准 TIDAS
单项或数组结构；SDK 不提供 `setText` / `getText` 方法。

```typescript
import { createContact } from '@tiangong-lca/tidas-sdk/core';

const contact = createContact();
const information =
  contact.contactDataSet.contactInformation.dataSetInformation;

information['common:name'] = [
  { '@xml:lang': 'zh', '#text': '示例数据管理员' },
  { '@xml:lang': 'en', '#text': 'Example data steward' },
];

const result = contact.validate();
if (!result.success) {
  console.error(result.error.issues);
}
```

完整且有效的联系人草稿见
[`examples/01-basic-usage/contact-draft.ts`](./examples/01-basic-usage/contact-draft.ts)。

## Schema 验证

```typescript
import {
  ContactSchema,
  parseWithZod,
  validateWithZod,
} from '@tiangong-lca/tidas-sdk/schemas';

const result = validateWithZod(value, ContactSchema);
const parsed = parseWithZod(jsonText, ContactSchema);
```

生成器直接读取 asset lock 选定的 Draft-07 JSON Schema。命名的领域 overlay
保留 CAS、多语言 validation code、`common:other`、必填多语言字段、Flow 名称条件
以及 review 条件。遇到未明确支持的验证关键字或 overlay 位置时，生成必须失败。

需要稳定的程序化错误处理时，应优先使用 `validateEnhanced()` 返回的
`validationIssues`，不要解析 Zod 的自然语言消息。

## 数据包 parity 验证

```typescript
import { validatePackageDir } from '@tiangong-lca/tidas-sdk/parity';

const report = validatePackageDir('/path/to/tidas-package');
if (!report.ok) {
  console.error(report.issues);
}
```

## XML 与目录转换

```typescript
import { datasetFromXml, datasetToXml } from '@tiangong-lca/tidas-sdk/xml';
import { convertDirectory } from '@tiangong-lca/tidas-sdk/tools';

const dataset = datasetFromXml(xmlPayload);
const xml = datasetToXml(dataset);

await convertDirectory('./input', './output', { toXml: true });
await convertDirectory('./eilcd-data', './tidas-output', { toXml: false });
```

数据库导出、ZIP 发布和 S3 工作流仍由
[`tidas-tools`](https://github.com/tiangong-lca/tidas-tools) 负责。

## 开发

```bash
cd sdks/typescript
npm ci --workspaces=false
npm run lint
npm run typecheck
npm test
npm run check:examples
npm run build
```

该包只使用一个 `typescript@7.x` 编译器轨道。Oxlint 负责类型感知 lint，
Node 24 通过 `tsx` 运行测试；发布 tarball 不会向消费者传递编译器、生成器、
lint 或测试工具。

常用命令：

```bash
npm run generate-types
npm run generate-schemas
npm run verify:schema-generation-parity
npm run test:coverage
npm run format:check
```

修改生成器前先构建 baseline。默认 baseline 是 `dist/schemas`；也可通过
`TIDAS_ZOD_BASELINE_DIR` 和 `TIDAS_ZOD_CANDIDATE_DIR` 指定产物。自动生成的
candidate 始终会清理。

维护中的示例都是可执行契约：

- `examples/01-basic-usage/contact-draft.ts`
- `examples/02-xml-roundtrip/xml-roundtrip.ts`
- `examples/test-imports.ts`

运行全部示例：

```bash
npm --prefix examples run check
```

## 发布

正常发布流程见 [RELEASE.md](./RELEASE.md)。提交发布 PR 前，在仓库根目录运行：

```bash
./scripts/ci/verify-typescript-package.sh
```

合并后，对精确的合并提交创建 `typescript-vX.Y.Z` tag，由仓库自己的 Trusted
Publishing workflow 完成发布。

## 仓库文档

- [仓库契约](../../AGENTS.md)
- [验证指南](../../docs/agents/repo-validation.md)
- [发布配置](../../docs/release-setup.md)
- [上游自动化](../../docs/upstream-automation.md)

## 许可证

MIT，参见 [LICENSE](./LICENSE)。
