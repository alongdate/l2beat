import type { DehydratedState } from '@tanstack/react-query'
import { HydrationBoundary } from '@tanstack/react-query'
import { CssVariables } from '~/components/CssVariables'
import { HorizontalSeparator } from '~/components/core/HorizontalSeparator'
import { TableFilterContextProvider } from '~/components/table/filters/TableFilterContext'
import { TableFilters } from '~/components/table/filters/TableFilters'
import type { AppLayoutProps } from '~/layouts/AppLayout.tsx'
import { AppLayout } from '~/layouts/AppLayout.tsx'
import { SideNavLayout } from '~/layouts/SideNavLayout'
import type { EcosystemEntry } from '~/server/features/ecosystems/getEcosystemEntry'
import { cn } from '~/utils/cn'
import { EcosystemPageHeader } from './components/EcosystemPageHeader'
import { EcosystemProjectsTable } from './components/EcosystemProjectsTable'
import { EcosystemsActivityChart } from './components/charts/EcosystemsActivityChart'
import { EcosystemsProjectsChart } from './components/charts/EcosystemsProjectsChart'
import { EcosystemsTvsChart } from './components/charts/EcosystemsTvsChart'
import { EcosystemBuildOnLink } from './components/widgets/EcosystemBuildOnLink'
import { EcosystemGovernanceLinks } from './components/widgets/EcosystemGovernanceLinks'
import { EcosystemLearnMoreLink } from './components/widgets/EcosystemLearnMoreLink'
import { EcosystemMilestonesAndIncidents } from './components/widgets/EcosystemMilestonesAndIncidents'
import { EcosystemMobileProjectLinks } from './components/widgets/EcosystemMobileProjectLinks'
import { EcosystemProjectsByDaLayer } from './components/widgets/EcosystemProjectsByDaLayer'
import { EcosystemProjectsByRaas } from './components/widgets/EcosystemProjectsByRaas'
import { EcosystemToken } from './components/widgets/EcosystemToken'
import { EcosystemTvsByStage } from './components/widgets/EcosystemTvsByStage'
import { EcosystemTvsByTokenType } from './components/widgets/EcosystemTvsByTokenType'
interface Props extends AppLayoutProps {
  ecosystem: EcosystemEntry
  queryState: DehydratedState
}

export function EcosystemProjectPage({
  ecosystem,
  queryState,
  ...props
}: Props) {
  return (
    <AppLayout {...props}>
      <HydrationBoundary state={queryState}>
        <SideNavLayout>
          <div className="relative z-[0] max-md:px-4" data-hide-overflow-x>
            <CssVariables
              variables={{
                'ecosystem-primary': ecosystem.colors.primary,
                'ecosystem-primary-50': `${ecosystem.colors.primary}80`,
                'ecosystem-primary-25': `${ecosystem.colors.primary}40`,
                'ecosystem-secondary': ecosystem.colors.secondary,
                spacing: '0.75rem',
              }}
            />
            <div className="-z-1 -translate-y-1/2 absolute top-44 right-[20%] h-[400vh] w-screen translate-x-1/2 bg-gradient-radial from-[--ecosystem-primary] via-25% via-[--ecosystem-secondary] to-transparent md:h-[180vh] lg:top-20 lg:w-[calc(100vw_-_15rem)]"></div>
            <div>
              <EcosystemPageHeader
                logo={ecosystem.logo}
                badges={ecosystem.badges}
                links={ecosystem.links.header}
              />
              <main className="my-[--spacing] grid grid-cols-12 gap-[--spacing]">
                <EcosystemMobileProjectLinks
                  links={ecosystem.links.header}
                  className="col-span-12"
                />
                <EcosystemsTvsChart
                  name={ecosystem.name}
                  entries={ecosystem.projects}
                  allScalingProjectsTvs={ecosystem.allScalingProjects.tvs}
                  className="col-span-12 md:col-span-6"
                />
                <EcosystemsActivityChart
                  name={ecosystem.name}
                  entries={ecosystem.projects}
                  allScalingProjectsUops={ecosystem.allScalingProjects.uops}
                  className="col-span-12 md:col-span-6"
                />
                <div className="col-span-12 grid gap-[--spacing] lg:hidden lg:grid-cols-2">
                  <EcosystemBuildOnLink
                    name={ecosystem.name}
                    slug={ecosystem.slug}
                    href={ecosystem.links.buildOn}
                    backgroundImage={ecosystem.images.buildOn}
                    className={cn(
                      ecosystem.slug === 'superchain' && 'text-primary',
                    )}
                  />
                  <EcosystemLearnMoreLink
                    name={ecosystem.name}
                    href={ecosystem.links.learnMore}
                  />
                </div>
                <EcosystemTvsByTokenType
                  tvsByTokenType={ecosystem.tvsByTokenType}
                  className="col-span-12 md:col-span-6 min-[1440px]:col-span-4"
                />
                <EcosystemTvsByStage
                  tvsByStage={ecosystem.tvsByStage}
                  className="col-span-12 md:col-span-6 min-[1440px]:col-span-4"
                />
                <EcosystemProjectsByDaLayer
                  projectsByDaLayer={ecosystem.projectsByDaLayer}
                  blobsData={ecosystem.blobsData}
                  className="col-span-12 md:col-span-6 min-[1440px]:col-span-4"
                />
                <EcosystemsProjectsChart
                  data={ecosystem.projectsChartData}
                  className="col-span-12 md:col-span-6 min-[1440px]:col-span-12"
                />
                <EcosystemToken
                  token={ecosystem.token}
                  className="col-span-12 lg:col-span-6"
                />
                <div className="col-span-12 grid grid-rows-2 gap-[--spacing] max-lg:hidden md:col-span-6">
                  <EcosystemBuildOnLink
                    name={ecosystem.name}
                    slug={ecosystem.slug}
                    href={ecosystem.links.buildOn}
                    backgroundImage={ecosystem.images.buildOn}
                    className={cn(
                      ecosystem.slug === 'superchain' && 'text-primary',
                    )}
                  />
                  <EcosystemLearnMoreLink
                    name={ecosystem.name}
                    href={ecosystem.links.learnMore}
                  />
                </div>
                <EcosystemMilestonesAndIncidents
                  milestones={ecosystem.milestones}
                  className="col-span-12"
                />
                <EcosystemProjectsByRaas
                  projectsByRaas={ecosystem.projectsByRaas}
                  className="col-span-12 lg:col-span-4"
                />
                <EcosystemGovernanceLinks
                  links={ecosystem.links.governance}
                  topDelegatesBackgroundImage={ecosystem.images.topDelegates}
                  className="col-span-12 lg:col-span-8"
                />
              </main>
              <HorizontalSeparator className="my-4 max-md:hidden" />
              <TableFilterContextProvider>
                <div className="mr-4 flex flex-wrap items-end justify-between gap-x-4 gap-y-2 md:mr-0">
                  <TableFilters entries={ecosystem.projects} />
                </div>
                <EcosystemProjectsTable
                  entries={ecosystem.projects}
                  ecosystemId={ecosystem.id}
                />
              </TableFilterContextProvider>
            </div>
          </div>
        </SideNavLayout>
      </HydrationBoundary>
    </AppLayout>
  )
}
