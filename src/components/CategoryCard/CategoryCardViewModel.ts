import { Users, User } from 'lucide-react-native';
import { colors } from '../../theme/colors';

type UseCategoryCardVMProps = {
  format: 'Singles' | 'Doubles';
  gender: 'Male' | 'Female';
  teamCount?: number;
};

export const useCategoryCardViewModel = ({
  format,
  gender,
  teamCount,
}: UseCategoryCardVMProps) => {
  const iconColor = gender === 'Male' ? colors.usersIconBackground : '#EC4899';
  const Icon = format === 'Doubles' ? Users : User;

  const showTeams = format === 'Doubles' && teamCount !== undefined;

  return {
    iconColor,
    Icon,
    showTeams,
  };
};
