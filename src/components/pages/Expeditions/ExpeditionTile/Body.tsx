import React from 'react'
import { connect } from 'react-redux'
import { Expedition } from 'aer-types/types'

import { RootState, selectors } from 'Redux/Store'

import InfoItem from 'components/molecules/InfoItem'

import Name from './Name'
import List from './List'
import { t } from 'i18n'

type OwnProps = {
  expedition: Expedition
}

const mapStateToProps = (state: RootState, ownProps: OwnProps) => ({
  usedExpansions:
    selectors.Settings.Expansions.Expansions.getExpansionNamesByIdList(state, {
      expansionIds: ownProps.expedition.settingsSnapshot.usedExpansions,
    }),
})

const mapDispatchToProps = {}

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  OwnProps

const Body = ({ expedition, usedExpansions }: Props) => (
  <React.Fragment>
    <Name variant="h6" component="h2">
      {expedition.name || expedition.id}
    </Name>
    <List>
      <InfoItem
        label={t('expeditions.tile.finished')}
        info={expedition.finished ? t('common.yes') : t('common.no')}
        data-test="info--expedition-finished"
      />
      <InfoItem
        label={t('expeditions.tile.score')}
        info={expedition.score.toString()}
        data-test="info--score"
      />
      <InfoItem
        label={t('expeditions.tile.bigPocket')}
        info={expedition.bigPocketVariant ? t('common.yes') : t('common.no')}
        data-test="info--big-pocket"
      />
      <InfoItem
        label={t('expeditions.tile.uniqueMageNames')}
        info={expedition.uniqueMageNames ? t('common.yes') : t('common.no')}
        data-test="info--unique-mage-names"
      />
      <InfoItem
        label={t('expeditions.tile.friendsAndFoes')}
        info={
          expedition.friendsAndFoesConfig ? t('common.yes') : t('common.no')
        }
        data-test="info--friends-and-foes"
      />
      {expedition.friendsAndFoesConfig && (
        <InfoItem
          label={t('expeditions.tile.banners')}
          info={`${expedition.friendsAndFoesConfig.playerCountForBanners + 2}`}
          data-test="info--banners"
        />
      )}
      <InfoItem
        label={t('expeditions.tile.seed')}
        info={expedition.seed.seed}
        data-test="info--seed"
      />
      <InfoItem
        label={t('expeditions.tile.usedExpansions')}
        info={usedExpansions.join(', ')}
        data-test="info--expansions"
      />
    </List>
  </React.Fragment>
)

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Body))
