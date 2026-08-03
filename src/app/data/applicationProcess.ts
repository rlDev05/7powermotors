import surfacePreparation from '@/styles/images/process/cr1-step-01-surface-preparation.jpg';
import motorcycleWashing from '@/styles/images/process/cr1-step-02-motorcycle-washing.jpg';
import completeDrying from '@/styles/images/process/cr1-step-03-complete-drying.jpg';
import surfaceDegreasing from '@/styles/images/process/cr1-step-04-surface-degreasing.jpg';
import sprayApplication from '@/styles/images/process/cr1-step-05-spray-application.jpg';
import finalInspection from '@/styles/images/process/cr1-step-06-final-inspection.jpg';

export const cr1ProcessSteps = [
  {
    number: '01',
    title: 'Surface Inspection and Preparation',
    description:
      'The motorcycle is inspected for scratches, stains, and surface imperfections. Where appropriate, correctable marks may be polished with professional equipment before coating begins.',
    note:
      'Tell the Pro Shop about specific areas of concern at drop-off. Some damage may not be fully correctable because of its depth, location, or condition.',
    image: surfacePreparation,
    alt: 'CR-1 technician inspecting and preparing a motorcycle surface',
  },
  {
    number: '02',
    title: 'Thorough Washing',
    description:
      'Dirt, road residue, dust, and surface contaminants are removed to create a clean foundation for the treatment stages that follow.',
    image: motorcycleWashing,
    alt: 'CR-1 motorcycle washing and surface cleaning process',
  },
  {
    number: '03',
    title: 'Complete Drying',
    description:
      'Residual water is carefully removed from panels, joints, engine components, and other detailed areas. Surfaces must be properly dry before degreasing and coating.',
    image: completeDrying,
    alt: 'Technician drying motorcycle components before CR-1 coating',
  },
  {
    number: '04',
    title: 'Surface Degreasing',
    description:
      'Oil, grease, wax residue, and contaminants that washing may leave behind are carefully removed to support proper bonding on the prepared surface.',
    image: surfaceDegreasing,
    alt: 'Motorcycle surface degreasing before CR-1 application',
  },
  {
    number: '05',
    title: 'Precision Spray Application',
    description:
      'CR-1 is applied methodically with a controlled low-pressure spray system across painted surfaces, metal parts, detailed components, and approved treatment areas.',
    note: 'Applied with control. Finished with care.',
    image: sprayApplication,
    alt: 'CR-1 coating applied using a controlled low-pressure spray gun',
  },
  {
    number: '06',
    title: 'Final Inspection and Completion',
    description:
      'The motorcycle receives a final inspection to confirm completion according to CR-1 application standards. The applicable service certificate is then issued by the CR-1 Pro Shop.',
    image: finalInspection,
    alt: 'Completed motorcycle after professional CR-1 application',
  },
];

export const cr1OfficialLinks = {
  certificate:
    'https://shomeisho-cr--1-jp.translate.goog/?_x_tr_sl=ja&_x_tr_tl=en&_x_tr_hl=fil',
  shops: 'https://www.cr-1.jp/shop/',
};
