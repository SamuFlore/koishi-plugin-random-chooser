import { Context, Schema } from 'koishi'

export const name = 'random-chooser'

export interface Config {}

export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context, config: Config) {
  // write your plugin here
  ctx.command('choose <count:number> <items...> 输入一个正整数和若干项，让 Koishi 机器人帮你选！')
    .usage('choose <count> <item1> <item2> ...')
    .example('choose 1 原神 鸣潮 绝区零 终末地  表示从四个游戏中选择一个。')
    .action((session, count, ...items) => {
      if (!Number.isInteger(count) || count <= 0) {
        return '请给出正整数数量'
      }
      if (items.length < count) {
        return `至少需要 ${count} 个选项，但只提供了 ${items.length} 个`
      }
      const arr = items.slice()
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
      }
      const picked = arr.slice(0, count)
      return `我建议选「${picked.join('，')}」。`
    })
}
