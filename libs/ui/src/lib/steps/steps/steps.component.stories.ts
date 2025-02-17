import { Meta, Story } from '@storybook/angular/';
import notes from './steps.component.md';
import { concatMap, delay, from, of } from 'rxjs';
import { StepsComponent } from './steps.component';
import { moduleMetadata } from '@storybook/angular';
import { UiModule } from '../../ui.module';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

const withObservableTitlesDelay = 1000;

export default {
  title: 'Angular/Steps/Steps',
  parameters: {
    layout: 'padded',
    notes,
  },
  decorators: [
    moduleMetadata({
      imports: [UiModule, ReactiveFormsModule],
    }),
  ],
  argTypes: {
    stepsContent: {
      controls: false,
    },
    currentStepIndex: {
      name: 'Current step (starting from 0)',
      control: { type: 'number', min: 0 },
    },
  },
  args: {
    title: 'Abiellumine',
    currentStepIndex: null,
    stepsContent: [
      '<a href="https://www.eesti.ee">Nevertheless, Cosy Moments thrives. It has its public.</a>',
      'Its contents are mildly interesting, if you like that sort of thing.',
      'There is a "Moments in the Nursery" page, conducted by Luella Granville Waterman.',
      'There is a "Moments of Meditation" page, conducted by the Reverend Edwin T. Philpotts.',
      '<div class="cvi-html-section__content"><div class="cvi-html-section__content-elements"><p>Võtke ühendust Politsei- ja Piirivalveametiga.</p></div><div class="cvi-html-section__content-elements"><cvi-web-track gap="4" layout="flex" flex-direction="vertical"><cvi-web-labeled-icon name="email"><a href="mailto:ppa&#64;politsei.ee">ppa&#64;politsei.ee</a></cvi-web-labeled-icon><cvi-web-labeled-icon name="screen_share"><a href="https://www.politsei.ee/" target="_blank" class="external-link" rel="noopener noreferrer">politsei.ee</a></cvi-web-labeled-icon><cvi-web-labeled-icon name="location">Pärnu mnt 139, 15060 Tallinn</cvi-web-labeled-icon></cvi-web-track></div></div>"',
      '<div class="cvi-html-section__content"><div class="cvi-html-section__content-elements"><p>Võtke ühendust perekonnaseisuasutusega, kus soovite abielu sõlmida.</p></div><div class="cvi-html-section__content-elements"><cvi-web-track gap="4" layout="flex" flex-direction="vertical"><cvi-web-labeled-icon name="screen_share"><a href="https://www.siseministeerium.ee/maakonnakeskuse-kohalikud-omavalitsused-rahvastiku-toimingute-valdkonnas" target="_blank" class="external-link" rel="noopener noreferrer">Maakonnakeskuse kohalikud omavalitsused</a></cvi-web-labeled-icon><cvi-web-labeled-icon name="screen_share"><a href="https://www.notar.ee/et/notarid/nimekiri" target="_blank" class="external-link" rel="noopener noreferrer">Notarid</a></cvi-web-labeled-icon><cvi-web-labeled-icon name="screen_share"><a href="https://www.siseministeerium.ee/abielu-solmimise-oigust-omavad-vaimulikud" target="_blank" class="external-link" rel="noopener noreferrer">Abielu sõlmimise õigust omavad vaimulikud</a></cvi-web-labeled-icon></cvi-web-track></div></div>"',
    ],
  },
} as Meta<StepsComponent>;

const Template: Story<StepsComponent> = (args: StepsComponent) => {
  const form = new FormGroup({
    text: new FormControl('Some text'),
  });
  return {
    component: StepsComponent,
    props: {
      ...args,
      form: form,
      formMinRows: 5,
      formHtmlId: 'fk123sd4kfds',
      formLabel: 'Label',
    },
    /* template */
    template: `
      <cvi-ng-steps [title]="title" [currentStepIndex]="currentStepIndex" [hasTableOfContents]="hasTableOfContents">
        <p cvi-steps="after-title" dataAttribute="steps-description">You can now add custom content before steps</p>
        <cvi-ng-step dataAttribute="step_1">
          <cvi-ng-step-panel [title]="title">
            <cvi-ng-html-section html="{{ stepsContent[0] }}"></cvi-ng-html-section>
          </cvi-ng-step-panel>
        </cvi-ng-step>
        <cvi-ng-step dataAttribute="step_2">
          <cvi-ng-step-panel title="Second">
            {{ stepsContent[1] }}
          </cvi-ng-step-panel>
        </cvi-ng-step>
        <cvi-ng-step dataAttribute="step_3">
          <cvi-ng-step-panel title="Third">
            {{ stepsContent[2] }}
          </cvi-ng-step-panel>
        </cvi-ng-step>
        <cvi-ng-step dataAttribute="step_4">
          <cvi-ng-step-panel title="Fourth">
            {{ stepsContent[3] }}
          </cvi-ng-step-panel>
        </cvi-ng-step>
        <cvi-ng-step dataAttribute="step_5">
          <cvi-ng-step-panel title="With a form">
            <div [formGroup]="form">
              Textarea, input and the character counter directive should work properly inside steps.
              <cvi-ng-form-item [label]="formLabel" [htmlId]="formHtmlId">
                <cvi-ng-textarea formControlName="text" cviNgCharacterCounter [maxChars]="30" [minRows]="formMinRows" [htmlId]="formHtmlId"></cvi-ng-textarea>
              </cvi-ng-form-item>
            </div>
          </cvi-ng-step-panel>
        </cvi-ng-step>
      </cvi-ng-steps>
    `,
  };
};

export const Default = Template.bind({});
export const DefaultWithSelectedStep = Template.bind({});
DefaultWithSelectedStep.args = {
  currentStepIndex: 0,
};

export const Mobile = Template.bind({});
Mobile.parameters = {
  layout: 'fullscreen',
  backgrounds: {
    default: 'light',
  },
  viewport: {
    defaultViewport: 'iphone12mini',
  },
};

export const MobileWithSelectedStep = Template.bind({});
MobileWithSelectedStep.args = {
  currentStepIndex: 0,
};
MobileWithSelectedStep.parameters = {
  layout: 'fullscreen',
  backgrounds: {
    default: 'light',
  },
  viewport: {
    defaultViewport: 'iphone12mini',
  },
};

const TemplateObservableTitles: Story = (args) => ({
  props: {
    ...args,
    labels$: from([['First', 'Second', 'Third']]).pipe(
      concatMap((item) => of(item).pipe(delay(withObservableTitlesDelay)))
    ),
  },
  /* template */
  template: `
    <cvi-ng-steps [title]="title" [currentStepIndex]="currentStepIndex" [hasTableOfContents]="hasTableOfContents">
      <ng-container *ngFor="let label of labels$ | async">
        <cvi-ng-step dataAttribute="step_1">
          <cvi-ng-step-panel [title]="label">
            {{ label }}
          </cvi-ng-step-panel>
        </cvi-ng-step>
      </ng-container>
    </cvi-ng-steps>
  `,
});

export const WithObservableTitles = TemplateObservableTitles.bind({});
WithObservableTitles.parameters = {
  chromatic: { delay: withObservableTitlesDelay + 300 },
};

const TemplateWithTranslations: Story<StepsComponent> = (
  args: StepsComponent
) => ({
  component: StepsComponent,
  props: {
    ...args,
  },
  /* template */
  template: `
    <cvi-ng-steps [title]="'common.steps.title' | translate" [currentStepIndex]="currentStepIndex" [hasTableOfContents]="hasTableOfContents">
      <p cvi-steps="after-title" dataAttribute="steps-description">You can now add custom content before steps</p>
      <cvi-ng-step dataAttribute="step_1">
        <cvi-ng-step-panel [title]="'common.steps.step1' | translate">
          <cvi-ng-html-section html="{{ stepsContent[0] }}"></cvi-ng-html-section>
        </cvi-ng-step-panel>
      </cvi-ng-step>
      <cvi-ng-step dataAttribute="step_2">
        <cvi-ng-step-panel [title]="'common.steps.step2' | translate">
          {{ stepsContent[1] }}
        </cvi-ng-step-panel>
      </cvi-ng-step>
      <cvi-ng-step dataAttribute="step_3">
        <cvi-ng-step-panel title="Third">
          {{ stepsContent[2] }}
        </cvi-ng-step-panel>
      </cvi-ng-step>
      <cvi-ng-step dataAttribute="step_4">
        <cvi-ng-step-panel title="Fourth">
          {{ stepsContent[3] }}
        </cvi-ng-step-panel>
      </cvi-ng-step>
    </cvi-ng-steps>
  `,
});

export const WithTranslations = TemplateWithTranslations.bind({});
WithTranslations.parameters = {
  axe: {
    // disabling because axe doesn't wait sometimes for the button text to load
    disabledRules: ['button-name'],
  },
};

const TemplateWithHTMLSections: Story<StepsComponent> = (
  args: StepsComponent
) => ({
  component: StepsComponent,
  props: {
    ...args,
  },
  /* template */
  template: `
    <cvi-ng-steps [title]="'common.steps.title' | translate" [currentStepIndex]="currentStepIndex" [hasTableOfContents]="hasTableOfContents">
      <p cvi-steps="after-title" dataAttribute="steps-description">You can now add custom content before steps</p>
      <cvi-ng-step dataAttribute="step_1">
        <cvi-ng-step-panel [title]="'common.steps.step1' | translate">
          <cvi-ng-html-section html="{{ stepsContent[5] }}"></cvi-ng-html-section>
        </cvi-ng-step-panel>
      </cvi-ng-step>
      <cvi-ng-step dataAttribute="step_2">
        <cvi-ng-step-panel [title]="'common.steps.step2' | translate">
          <cvi-ng-html-section html="{{ stepsContent[4] }}"></cvi-ng-html-section>
        </cvi-ng-step-panel>
      </cvi-ng-step>
    </cvi-ng-steps>
  `,
});

export const WithHTMLSections = TemplateWithHTMLSections.bind({});
WithHTMLSections.parameters = {
  axe: {
    // disabling because axe doesn't wait sometimes for the button text to load
    disabledRules: ['button-name'],
  },
};

const TemplateWithStepStatus: Story = (args) => ({
  component: StepsComponent,
  props: {
    ...args,
  },
  /* template */
  template: `
    <cvi-ng-steps [title]="title" [currentStepIndex]="currentStepIndex">
      <cvi-ng-step>
        <cvi-ng-step-panel title="First" [status]="null">
          <span>Status is set to 'null'.</span>
        </cvi-ng-step-panel>
      </cvi-ng-step>
      <cvi-ng-step>
        <cvi-ng-step-panel title="Second" [status]="'success'">
          <span>Success status!</span>
        </cvi-ng-step-panel>
      </cvi-ng-step>
      <cvi-ng-step>
        <cvi-ng-step-panel title="Third">
          <span>Status is not set.</span>
        </cvi-ng-step-panel>
      </cvi-ng-step>
      <cvi-ng-step>
        <cvi-ng-step-panel title="Fourth" [status]="'error'">
          <span>Error status!</span>
        </cvi-ng-step-panel>
      </cvi-ng-step>
    </cvi-ng-steps>
  `,
});

export const WithStepStatuses = TemplateWithStepStatus.bind({});
WithStepStatuses.args = {
  currentStepIndex: 0,
};
