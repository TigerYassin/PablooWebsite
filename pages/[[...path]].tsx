import '../lib/makeswift/register-components'
import '../lib/components/CalculatorView/calculatorView.css'

import { Makeswift } from '@makeswift/runtime/next'
// import TagManager from 'react-gtm-module'

import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next'

import {
  Page as MakeswiftPage,
  PageProps as MakeswiftPageProps,
} from '@makeswift/runtime/next'

type ParsedUrlQuery = { path?: string[] }
export async function getStaticPaths(): Promise<
  GetStaticPathsResult<ParsedUrlQuery>
> {
  const temp_text = "d4106616-dae3-4818-b559-208caa823641"
  const makeswift = new Makeswift(temp_text!)
  const pages = await makeswift.getPages()

  return {
    paths: pages.map((page) => ({
      params: {
        path: page.path.split('/').filter((segment) => segment !== ''),
      },
    })),
    fallback: 'blocking',
  }
}

type Props = MakeswiftPageProps

export async function getStaticProps(
  ctx: GetStaticPropsContext<ParsedUrlQuery>
): Promise<GetStaticPropsResult<Props>> {
  const temp_text = "d4106616-dae3-4818-b559-208caa823641"
  const makeswift = new Makeswift(temp_text!)
  const path = '/' + (ctx.params?.path ?? []).join('/')
  const snapshot = await makeswift.getPageSnapshot(path, {
    preview: ctx.preview,
  })

  if (snapshot == null) return { notFound: true, revalidate: 10 }
  return { props: { snapshot }, revalidate: 10 }
}

export default function Page({ snapshot }: Props) {
  return <MakeswiftPage snapshot={snapshot} />
}
