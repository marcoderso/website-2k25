import { basehub, fragmentOn as baseFragmentOn } from "basehub"

// Wrapper that bypasses TypeScript schema validation for empty/missing schemas
const createFlexibleClient = () => {
  const baseClient = basehub()

  return {
    ...baseClient,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    query: (q: any) => baseClient.query(q as any)
  }
}

// Flexible fragmentOn that works with empty schemas
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fragmentOn: typeof baseFragmentOn = (type: any, selection: any) =>
  baseFragmentOn(type, selection)

export class BaseHubService {
  private static instance: BaseHubService | null = null
  client: ReturnType<typeof createFlexibleClient>

  private constructor() {
    this.client = createFlexibleClient()
  }

  static getInstance() {
    if (!BaseHubService.instance) {
      BaseHubService.instance = new BaseHubService()
    }
    return BaseHubService.instance
  }
}

export const client = () => {
  return BaseHubService.getInstance().client
}
