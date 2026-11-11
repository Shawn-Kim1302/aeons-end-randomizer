import React from 'react'
import CardContent from '@material-ui/core/CardContent'

import Card from '../../atoms/Card'
import H1 from '../../atoms/H1'
import H2 from '../../atoms/H2'
import P from '../../atoms/P'
import A from '../../atoms/A'
import Li from '../../atoms/Li'
import { t } from 'i18n'

const About = () => (
  <Card>
    <CardContent>
      <H1>Aeons End Randomizer</H1>

      <a href="https://on3iro.github.io/aeons-end-randomizer">
        <img
          alt="docs"
          src="https://img.shields.io/badge/Docs-on3iro.github.io%2Faeons--end--randomizer-success"
        />
      </a>

      <P>
        <b>Aeons End Randomizer</b> {t('about.intro')}
      </P>
      <P>
        {t('about.getStarted')}
        <A to="/settings"> {t('common.goToSettings')}</A>.
      </P>
      <H2>{t('about.supportedExpansions')}</H2>
      <P>
        <b>Aeons End Randomizer</b> {t('about.supportedExpansionsText')}
      </P>
      <ul>
        <Li>Aeons End</Li>
        <Li>The Depths</Li>
        <Li>The Nameless</Li>
        <Li>Aeons End: War Eternal</Li>
        <Li>The Void</Li>
        <Li>The Outer Dark</Li>
        <Li>Aeons End: Legacy</Li>
        <Li>Buried Secrets</Li>
        <Li>Aeons End: The New Age</Li>
        <Li>Into The Wild</Li>
        <Li>The Ancients</Li>
        <Li>Shattered Dreams</Li>
        <Li>Aeons End: Outcasts</Li>
        <Li>Return To Gravehold</Li>
        <Li>Southern Village</Li>
      </ul>

      <H2>{t('about.supportedLanguages')}</H2>
      <P>{t('about.supportedLanguagesText')}</P>
      <ul>
        <Li>{t('about.languageEnglish')}</Li>
        <Li>{t('about.languagePolish')}</Li>
        <Li>{t('about.languageFrench')}</Li>
        <Li>{t('about.languageGerman')}</Li>
      </ul>
      <P>
        <i>{t('about.contributeLanguages')}</i>
      </P>

      <H2>{t('about.userDocumentation')}</H2>
      <P>
        {t('about.userDocumentationText')}{' '}
        <a href="https://on3iro.github.io/aeons-end-randomizer/">
          https://on3iro.github.io/aeons-end-randomizer/
        </a>
      </P>

      <H2>{t('about.premadeExpeditions')}</H2>
      <P>
        {t('about.premadeIntro')}{' '}
        <a href="https://github.com/on3iro/aeons-end-randomizer/blob/main/expeditions/newAge.json">
          "The New Age"
        </a>{' '}
        {t('about.premadeAnd')}{' '}
        <a href="https://github.com/on3iro/aeons-end-randomizer/blob/main/expeditions/intoTheWild.json">
          "Into The Wild"
        </a>{' '}
        {t('about.premadeOutro')}
      </P>

      <H2>{t('about.userData')}</H2>
      <P>{t('about.userDataText')}</P>
      <H2>{t('about.officialImagery')}</H2>
      <P>{t('about.officialImageryText')}</P>
      <H2>{t('about.copyright')}</H2>
      <P>
        Aeons End is copyrighted &#169; 2016-2019 by Indie Boards & Cards and
        ActionPhase Games, all rights reserved.
      </P>
      <P>
        All the used RPG-Icons are from Rpg-Awesome, Copyright (c) 2014, Daniela
        Howe All rights reserved.
      </P>
    </CardContent>
  </Card>
)

export default React.memo(About)
